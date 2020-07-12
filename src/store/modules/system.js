import API from "@/helpers/api";
import delay from "@/helpers/delay";

// Initial state
const state = () => ({
  loading: true,
  rebooting: false,
  hasRebooted: false,
  shuttingDown: false,
  hasShutdown: false,
  unit: "sats", //sats or btc
  api: {
    operational: false,
    version: ""
  },
  managerApi: {
    operational: false,
    version: ""
  },
  onionAddress: ""
});

// Functions to update the state directly
const mutations = {
  setUnit(state, unit) {
    state.unit = unit;
  },
  setApi(state, api) {
    state.api = api;
  },
  setManagerApi(state, api) {
    state.managerApi = api;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
  setRebooting(state, rebooting) {
    state.rebooting = rebooting;
  },
  setHasRebooted(state, hasRebooted) {
    state.hasRebooted = hasRebooted;
  },
  setShuttingDown(state, shuttingDown) {
    state.shuttingDown = shuttingDown;
  },
  setHasShutDown(state, hasShutdown) {
    state.hasShutdown = hasShutdown;
  },
  setOnionAddress(state, address) {
    state.onionAddress = address;
  }
};

// Functions to get data from the API
const actions = {
  async getUnit({ commit }) {
    if (window.localStorage && window.localStorage.getItem("unit")) {
      commit("setUnit", window.localStorage.getItem("unit"));
    }
  },
  changeUnit({ commit }, unit) {
    if (unit === "sats" || unit === "btc") {
      window.localStorage.setItem("unit", unit);
      commit("setUnit", unit);
    }
  },
  async getApi({ commit }) {
    const api = await API.get(`${process.env.VUE_APP_MIDDLEWARE_API_URL}/ping`);
    commit("setApi", {
      operational: !!(api && api.version),
      version: api && api.version ? api.version : ""
    });
  },
  async getManagerApi({ commit }) {
    const api = await API.get(`${process.env.VUE_APP_MANAGER_API_URL}/ping`);
    commit("setManagerApi", {
      operational: !!(api && api.version),
      version: api && api.version ? api.version : ""
    });
  },
  async getOnionAddress({ commit }) {
    const address = await API.get(`${process.env.VUE_APP_MANAGER_API_URL}/v1/system/dashboard-hidden-service`);
    commit("setOnionAddress", address);
  },
  async shutdown({ commit }) {

    // Reset any cached hasShutdown value from previous shutdown
    commit("setHasShutDown", false);

    // Shutting down
    commit("setShuttingDown", true);

    // API call here
    await delay(3000);

    // Not shutting down anymore because
    // the system has shut down successfully 
    commit("setShuttingDown", false);
    commit("setHasShutDown", true);
  },
  async reboot({ commit }) {

    // Reset any cached hasRebooted value from previous reboot
    commit("setHasRebooted", false);

    // Rebooting
    commit("setRebooting", true);

    // API call here
    await delay(3000);

    // Not rebooting down anymore because
    // the system has rebooted successfully 
    commit("setRebooting", false);
    commit("setHasRebooted", true);
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
