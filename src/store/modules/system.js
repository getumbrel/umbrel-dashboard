import API from "@/helpers/api";

// Initial state
const state = () => ({
  unit: 'sats', //sats or btc
  api: {
    operational: false,
    version: ""
  }
});

// Functions to update the state directly
const mutations = {
  setUnit(state, unit) {
    state.unit = unit;
  },
  setApi(state, api) {
    state.api = api;
  }
};

// Functions to get data from the API
const actions = {
  changeUnit({ commit }, unit) {
    if (unit === 'sats' || unit === 'btc') {
      commit("setUnit", unit);
    }
  },
  async getApi({ commit }) {
    const api = await API.get(`${process.env.VUE_APP_API_URL}/ping`);
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
