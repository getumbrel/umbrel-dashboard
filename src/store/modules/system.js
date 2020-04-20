import API from "@/helpers/api";

// Initial state
const state = () => ({
  api: {
    operational: false,
    version: ""
  }
});

// Functions to update the state directly
const mutations = {
  setApi(state, api) {
    state.api = api;
  }
};

// Functions to get data from the API
const actions = {
  async getApi({ commit }) {
    const api = await API.get(`${process.env.VUE_APP_API_URL}api/ping`);
    commit("setApi", {
      operational: !!(api && api.version),
      version: api && api.version ? api.version : ""
    });
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
