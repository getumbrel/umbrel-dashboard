import API from "@/helpers/api";

// Initial state
const state = () => ({
  version: "",
  availableUpdate: {
    version: "", //update version available to download
    name: "",
    notes: "",
  },
  updateStatus: {
    state: "", //available, unavailable, installing, successful, failed
    progress: 0, //progress of update installation
    description: ""
  },
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
  setVersion(state, version) {
    state.version = version;
  },
  setUnit(state, unit) {
    state.unit = unit;
  },
  setApi(state, api) {
    state.api = api;
  },
  setManagerApi(state, api) {
    state.managerApi = api;
  },
  setOnionAddress(state, address) {
    state.onionAddress = address;
  },
  setAvailableUpdate(state, update) {
    state.availableUpdate = update;
  },
  setUpdateStatus(state, status) {
    state.updateStatus = status
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
  async getAvailableUpdate({ commit }) {
    const update = await API.get(`${process.env.VUE_APP_MANAGER_API_URL}/v1/system/get-update`);
    if (update && update.version) {
      commit("setAvailableUpdate", update);
    } else {
      commit("setAvailableUpdate", {
        version: "",
        name: "",
        notes: "",
      });
    }
  },
  async getUpdateStatus({ commit }) {
    const status = await API.get(`${process.env.VUE_APP_MANAGER_API_URL}/v1/system/update-status`);
    if (status && status.progress) {
      commit("setUpdateStatus", status);
    }
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
