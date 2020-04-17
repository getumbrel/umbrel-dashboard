import axios from 'axios';

// An object to store the response time of completed API requests
const responseTime = {};

// An object to store pending API requests
const responsePending = {};

// Helper methods for making API requests
const API = {
    async get(url, config = {}) {
        let response;

        if (responsePending[url] === undefined || responsePending[url] === false) {
            responsePending[url] = true;

            try {
                const startTime = new Date();
                response = (await axios.get(url, config)).data;
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
            console.warn(`Warning: A request to ${url} is already in progress. Duplicate connection skipped.`);
        }

        return response;
    },

    // Wrap a post call
    async post(url, data) {


        return axios({
            method: "post",
            url,
            data
        });

        // If an instance of axios is passed, use it to make the call. Otherwise, use a fresh instance.
        // if (options.axios) {
        //     return await options.axios.post(options.url, options.data, options.auth);
        // } else {
        //     return axios.post(options.url, options.data, options.auth);
        // }

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
