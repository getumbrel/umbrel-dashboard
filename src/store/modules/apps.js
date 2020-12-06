import API from "@/helpers/api";
// import Vue from "vue"

// Initial state
const state = () => ({
  installed: [],
  store: [],
  installing: [{ id: 'btcpay', startedAt: new Date() }],
  uninstalling: [{ id: 'mempool-space', startedAt: new Date() }]
});

// Functions to update the state directly
const mutations = {
  setInstalledApps(state, apps) {
    const alphabeticallySortedApps = apps.sort((a, b) => a.name.localeCompare(b.name));
    state.installed = alphabeticallySortedApps;
  },
  setAppStore(state, appStore) {
    // const installedApps = state.installed;
    // for (let installedApp of installedApps) {
    //   const appIndex = appStore.findIndex((app) => app.id === installedApp.id);

    //   // To trigger reactive changes: https://vuejs.org/v2/guide/reactivity.html#For-Arrays
    //   Vue.set(appStore, appIndex, {
    //     ...appStore[appIndex],
    //     isInstalled: true
    //   });
    // }
    state.store = appStore;
  }
};

// Functions to get data from the API
const actions = {
  async getInstalledApps({ commit }) {
    const installedApps = await API.get(`${process.env.VUE_APP_MANAGER_API_URL}/v1/apps?installed=1`);
    if (installedApps) {
      commit("setInstalledApps", installedApps);
    }
  },
  async getAppStore({ commit, dispatch }) {
    dispatch("getInstalledApps");
    const appStore = await API.get(`${process.env.VUE_APP_MANAGER_API_URL}/v1/apps`);
    if (appStore) {
      commit("setAppStore", appStore);
    }
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
