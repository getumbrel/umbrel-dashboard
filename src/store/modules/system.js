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
    description: "",
  },
  backupStatus: {
    status: "", //success, failed
    timestamp: null,
  },
  debugResult: {
    status: "", //success, processing
    result: "",
  },
  showUpdateConfirmationModal: false,
  loading: true,
  rebooting: false,
  hasRebooted: false,
  shuttingDown: false,
  hasShutdown: false,
  unit: "sats", //sats or btc
  api: {
    operational: false,
    version: "",
  },
  managerApi: {
    operational: false,
    version: "",
  },
  onionAddress: "",
  storage: {
    total: 0,
    used: 0,
    breakdown: [],
  },
  ram: {
    total: 0,
    used: 0,
    breakdown: [],
  },
  isUmbrelOS: false,
  cpuTemperature: 0, //in celsius
  cpuTemperatureUnit: "celsius",
  uptime: null,
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
  },
  setAvailableUpdate(state, update) {
    state.availableUpdate = update;
  },
  setUpdateStatus(state, status) {
    state.updateStatus = status;
  },
  setBackupStatus(state, status) {
    state.backupStatus = status;
  },
  setDebugResult(state, result) {
    state.debugResult = result;
  },
  setShowUpdateConfirmationModal(state, show) {
    state.showUpdateConfirmationModal = show;
  },
  setStorage(state, storage) {
    state.storage = storage;
  },
  setRam(state, ram) {
    state.ram = ram;
  },
  setIsUmbrelOS(state, isUmbrelOS) {
    state.isUmbrelOS = isUmbrelOS;
  },
  setCpuTemperature(state, cpuTemperature) {
    state.cpuTemperature = cpuTemperature;
  },
  setCpuTemperatureUnit(state, cpuTemperatureUnit) {
    state.cpuTemperatureUnit = cpuTemperatureUnit;
  },
  setUptime(state, uptime) {
    state.uptime = uptime;
  },
};

// Functions to get data from the API
const actions = {
  async getVersion({ commit }) {
    const data = await API.get(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/info`
    );
    if (data && data.version) {
      let { version } = data;
      if (data.build) {
        version += `-build-${data.build}`;
      }
      commit("setVersion", version);
    }
  },
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
      version: api && api.version ? api.version : "",
    });
  },
  async getManagerApi({ commit }) {
    const api = await API.get(`${process.env.VUE_APP_MANAGER_API_URL}/ping`);
    commit("setManagerApi", {
      operational: !!(api && api.version),
      version: api && api.version ? api.version : "",
    });
  },
  async getOnionAddress({ commit }) {
    const address = await API.get(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/dashboard-hidden-service`
    );
    commit("setOnionAddress", address);
  },
  async getAvailableUpdate({ commit }) {
    const update = await API.get(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/get-update`
    );
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
  hideUpdateConfirmationModal({ commit }) {
    commit("setShowUpdateConfirmationModal", false);
  },
  confirmUpdate({ commit }) {
    commit("setShowUpdateConfirmationModal", true);
  },
  async getUpdateStatus({ commit }) {
    const status = await API.get(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/update-status`
    );
    if (status && status.progress) {
      commit("setUpdateStatus", status);
    }
  },
  async getBackupStatus({ commit }) {
    const status = await API.get(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/backup-status`
    );
    if (status && status.timestamp) {
      commit("setBackupStatus", status);
    }
  },
  async getDebugResult({ commit }) {
    const result = await API.get(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/debug-result`
    );

    if (!result) {
      throw new Error("Get debug request failed");
    }

    commit("setDebugResult", result);
  },
  async debug({ commit }) {
    const result = await API.post(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/debug`
    );

    if (!result) {
      throw new Error("Debug request failed");
    }

    commit("setDebugResult", result);
  },
  async shutdown({ commit }) {
    // Reset any cached hasShutdown value from previous shutdown
    commit("setHasShutDown", false);

    // Shutting down
    const result = await API.post(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/shutdown`
    );
    if (!result) {
      throw new Error("Shutdown request failed");
    }

    commit("setShuttingDown", true);

    // Poll to check if system has shut down
    const pollIfDown = window.setInterval(async () => {
      const { version } = await API.get(
        `${process.env.VUE_APP_MANAGER_API_URL}/ping`
      );
      if (!version) {
        // System shut down succesfully
        window.clearInterval(pollIfDown);
        // Optimistically give another 30s to the system to shut down
        return window.setTimeout(() => {
          commit("setShuttingDown", false);
          commit("setHasShutDown", true);
        }, 30 * 1000);
      }
    }, 2000);
  },
  async reboot({ commit }) {
    // Reset any cached hasRebooted value from previous reboot
    commit("setHasRebooted", false);

    // Rebooting
    const result = await API.post(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/reboot`
    );
    if (!result) {
      throw new Error("Reboot request failed");
    }

    commit("setRebooting", true);

    let pollIfUp;

    // Poll to check if system has shut down
    const pollIfDown = window.setInterval(async () => {
      const { version } = await API.get(
        `${process.env.VUE_APP_MANAGER_API_URL}/ping`
      );
      if (!version) {
        // System shut down succesfully
        window.clearInterval(pollIfDown);

        // Now we'll poll to check if it's up
        pollIfUp = window.setInterval(async () => {
          const { version } = await API.get(
            `${process.env.VUE_APP_MANAGER_API_URL}/ping`
          );
          if (version) {
            // System is online again
            commit("setRebooting", false);
            commit("setHasRebooted", true);
            return window.clearInterval(pollIfUp);
          }
        }, 2000);
        return;
      }
    }, 2000);
  },
  async getStorage({ commit }) {
    const storage = await API.get(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/storage`
    );
    if (storage && storage.total) {
      storage.breakdown.sort((app1, app2) => app2.used - app1.used);
      commit("setStorage", storage);
    }
  },
  async getRam({ commit }) {
    const ram = await API.get(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/memory`
    );
    if (ram && ram.total) {
      ram.breakdown.sort((app1, app2) => app2.used - app1.used);
      commit("setRam", ram);
    }
  },
  async getIsUmbrelOS({ commit }) {
    const isUmbrelOS = await API.get(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/is-umbrel-os`
    );
    commit("setIsUmbrelOS", !!isUmbrelOS);
  },
  async getCpuTemperature({ commit }) {
    const cpuTemperature = await API.get(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/temperature`
    );
    if (cpuTemperature) {
      commit("setCpuTemperature", cpuTemperature);
    }
  },
  async getCpuTemperatureUnit({ commit }) {
    if (
      window.localStorage &&
      window.localStorage.getItem("cpuTemperatureUnit")
    ) {
      commit(
        "setCpuTemperatureUnit",
        window.localStorage.getItem("cpuTemperatureUnit")
      );
    }
  },
  changeCpuTemperatureUnit({ commit }, unit) {
    if (unit === "celsius" || unit === "fahrenheit") {
      window.localStorage.setItem("cpuTemperatureUnit", unit);
      commit("setCpuTemperatureUnit", unit);
    }
  },
  async getUptime({ commit }) {
    const uptime = await API.get(
      `${process.env.VUE_APP_MANAGER_API_URL}/v1/system/uptime`
    );
    if (uptime) {
      commit("setUptime", uptime);
    }
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
