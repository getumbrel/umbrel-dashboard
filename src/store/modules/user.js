import API from "@/helpers/api";

// Initial state
const state = () => ({
  name: "Satoshi",
  jwt: window.localStorage.getItem("jwt") || ""
});

// Functions to update the state directly
const mutations = {
  setJWT(state, jwt) {
    window.localStorage.setItem("jwt", jwt);
    state.jwt = jwt;
  }
};

// Functions to get data from the API
const actions = {
  async login({ commit }, password) {

    const { data } = await API.post(
      `${process.env.VUE_APP_SYSTEM_API_URL}/v1/account/login`,
      { password }
    );

    if (data && data.jwt) {
      commit("setJWT", data.jwt);
    }
  },
  logout({ commit }) {
    commit("setJWT", "");
  },
  async refreshJWT({ commit }) {
    const { data } = await API.post(`${process.env.VUE_APP_SYSTEM_API_URL}/v1/account/refresh`);
    if (data && data.jwt) {
      commit("setJWT", data.jwt);
    }
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
