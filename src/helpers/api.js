import axios from "axios";
import store from "@/store";
import router from "@/router";

// An object to store the response time of completed API requests
const responseTime = {};

// An object to store pending API requests
const responsePending = {};

// Interceptor to refresh JWT or logout user based on 401 requests
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger

  // Return any error which is not due to authentication back to the calling service
  if (!error.response || error.response.status !== 401) {
    return Promise.reject(error);
  }

  // Return the same 401 back if user is trying to login with incorrect password
  if (error.config.url === `${process.env.VUE_APP_SYSTEM_API_URL}/v1/account/login`) {
    return Promise.reject(error);
  }

  // Logout user if token refresh didn't work
  if (error.config.url === `${process.env.VUE_APP_SYSTEM_API_URL}/v1/account/refresh` || error.config.message === "Invalid JWT") {
    store.dispatch('user/logout')
    router.push('/');

    return Promise.reject(error);
  }

  // Try request again with new token
  try {
    await store.dispatch('user/refreshJWT');
  } catch (error) {
    return Promise.reject(error);
  }

  // New request with new token
  const config = error.config;
  config.headers['Authorization'] = `JWT ${store.state.user.jwt}`;

  return new Promise((resolve, reject) => {
    axios.request(config).then(response => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    })
  });

});

// Helper methods for making API requests
const API = {
  async get(url, data = {}) {
    let response;

    if (responsePending[url] === undefined || responsePending[url] === false) {
      responsePending[url] = true;

      try {
        const startTime = new Date();
        // await new Promise(resolve => setTimeout(resolve, 2000)) //2s API delay

        const requestOptions = {
          method: "get",
          url
        };

        if (store.state.user.jwt) {
          requestOptions.headers = { 'Authorization': `JWT ${store.state.user.jwt}` };
        }

        response = (await axios(requestOptions, data)).data;
        const endTime = new Date();

        responseTime[url] = (endTime.getTime() - startTime.getTime()) / 1000;
      } catch (error) {
        // Only display error messages in the browser console
        if (process.browser) {
          console.error(error);
        }

        response = false;
      } finally {
        responsePending[url] = false; // eslint-disable-line require-atomic-updates
      }
    } else {
      console.warn(
        `Warning: A request to ${url} is already in progress. Duplicate connection skipped.`
      );
    }

    return response;
  },

  // Wrap a post call
  async post(url, data) {

    const requestOptions = {
      method: "post",
      url,
      data
    };

    if (store.state.user.jwt) {
      requestOptions.headers = { 'Authorization': `JWT ${store.state.user.jwt}` };
    }

    return axios(requestOptions);
  },


  // Wrap a delete call
  async delete(url, data) {

    const requestOptions = {
      method: "delete",
      url,
      data
    };

    if (store.state.user.jwt) {
      requestOptions.headers = { 'Authorization': `JWT ${store.state.user.jwt}` };
    }

    return axios(requestOptions);
  },

  // Return the response time if this URL has already been fetched
  responseTime(url) {
    let duration = -1;

    if (responseTime[url] !== undefined) {
      duration = responseTime[url];
    }

    return duration;
  }
};

export default API;
