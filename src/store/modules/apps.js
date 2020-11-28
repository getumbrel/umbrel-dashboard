// import API from "@/helpers/api";
// import Vue from "vue";

let appStore = [
  {
    id: "btcpay",
    category: "Merchants",
    name: "BTCPay Server",
    version: "3.2.2",
    tagline: "Accept Bitcoin payments with zero fees and no third-party",
    description: "BTCPay is a non-custodial invoicing system which eliminates the involvement of a third-party. Payments with BTCPay go directly to your wallet, which increases the privacy and security. Your private keys are never uploaded to the server. There is no address re-use, since each invoice generates a new address deriving from your xpubkey.\n\nBTCPay is a non-custodial invoicing system which eliminates the involvement of a third-party. Payments with BTCPay go directly to your wallet, which increases the privacy and security. Your private keys are never uploaded to the server. There is no address re-use, since each invoice generates a new address deriving from your xpubkey.",
    developer: "BTCPay Foundation",
    repo: "https://github.com/btcpayserver/btcpayserver",
    gallery: ["1.png", "2.png", "3.png"],
    compatible: true,
    dependencies: [{ id: "bitcoind", version: "0.20.1" }, { id: "lnd", version: "0.11.1" }],
    website: "https://btcpayserver.org",
    port: 6001
  },
  {
    id: "mempool-space",
    category: "Explorers",
    name: "mempool.space",
    version: "2.9.2",
    tagline: "Mempool visualizer for the Bitcoin network",
    description: "BTCPay is a non-custodial invoicing system which eliminates the involvement of a third-party. Payments with BTCPay go directly to your wallet, which increases the privacy and security. Your private keys are never uploaded to the server. There is no address re-use, since each invoice generates a new address deriving from your xpubkey.",
    developer: "BTCPay Foundation",
    repo: "https://github.com/btcpayserver/btcpayserver",
    gallery: ["1.png", "2.png", "3.png"],
    compatible: true,
    dependencies: [{ id: "bitcoind", version: "0.20.1" }, { id: "lnd", version: "0.11.1" }],
    website: "https://btcpayserver.org",
    port: 6002
  },
  {
    id: "btc-rpc-explorer",
    category: "Explorers",
    name: "BTC RPC Explorer",
    version: "0.7.2",
    tagline: "A simple explorer for the Bitcoin blockchain",
    description: "BTCPay is a non-custodial invoicing system which eliminates the involvement of a third-party. Payments with BTCPay go directly to your wallet, which increases the privacy and security. Your private keys are never uploaded to the server. There is no address re-use, since each invoice generates a new address deriving from your xpubkey.",
    developer: "BTCPay Foundation",
    repo: "https://github.com/btcpayserver/btcpayserver",
    gallery: ["1.png", "2.png", "3.png"],
    compatible: true,
    dependencies: [{ id: "bitcoind", version: "0.20.1" }, { id: "lnd", version: "0.11.1" }],
    website: "https://btcpayserver.org",
    port: 6003
  },
  {
    id: "dojo",
    category: "Wallets",
    name: "Dojo",
    version: "0.7.2",
    tagline: "Private server for Samourai Wallet",
    description: "BTCPay is a non-custodial invoicing system which eliminates the involvement of a third-party. Payments with BTCPay go directly to your wallet, which increases the privacy and security. Your private keys are never uploaded to the server. There is no address re-use, since each invoice generates a new address deriving from your xpubkey.",
    developer: "BTCPay Foundation",
    repo: "https://github.com/btcpayserver/btcpayserver",
    gallery: ["1.png", "2.png", "3.png"],
    compatible: true,
    dependencies: [{ id: "bitcoind", version: "0.20.1" }, { id: "lnd", version: "0.11.1" }],
    website: "https://btcpayserver.org",
    port: 6004
  },
  {
    id: "specter",
    category: "Wallets",
    name: "Specter",
    version: "0.7.2",
    tagline: "Multi-sig Bitcoin made easy",
    description: "BTCPay is a non-custodial invoicing system which eliminates the involvement of a third-party. Payments with BTCPay go directly to your wallet, which increases the privacy and security. Your private keys are never uploaded to the server. There is no address re-use, since each invoice generates a new address deriving from your xpubkey.",
    developer: "BTCPay Foundation",
    repo: "https://github.com/btcpayserver/btcpayserver",
    gallery: ["1.png", "2.png", "3.png"],
    compatible: true,
    dependencies: [{ id: "bitcoind", version: "0.20.1" }, { id: "lnd", version: "0.11.1" }],
    website: "https://btcpayserver.org",
    port: 6005
  },
  {
    id: "lndhub",
    category: "Lightning",
    name: "LNDhub",
    version: "0.7.2",
    tagline: "Multi-account wrapper for LND",
    description: "BTCPay is a non-custodial invoicing system which eliminates the involvement of a third-party. Payments with BTCPay go directly to your wallet, which increases the privacy and security. Your private keys are never uploaded to the server. There is no address re-use, since each invoice generates a new address deriving from your xpubkey.",
    developer: "BTCPay Foundation",
    repo: "https://github.com/btcpayserver/btcpayserver",
    gallery: ["1.png", "2.png", "3.png"],
    compatible: true,
    dependencies: [{ id: "bitcoind", version: "0.20.1" }, { id: "lnd", version: "0.11.1" }],
    website: "https://btcpayserver.org",
    port: 6006
  },
  {
    id: "rtl",
    category: "Lightning",
    name: "Ride The Lightning",
    version: "0.7.2",
    tagline: "A powerful dashboard for Lightning",
    description: "BTCPay is a non-custodial invoicing system which eliminates the involvement of a third-party. Payments with BTCPay go directly to your wallet, which increases the privacy and security. Your private keys are never uploaded to the server. There is no address re-use, since each invoice generates a new address deriving from your xpubkey.",
    developer: "BTCPay Foundation",
    repo: "https://github.com/btcpayserver/btcpayserver",
    gallery: ["1.png", "2.png", "3.png"],
    compatible: true,
    dependencies: [{ id: "bitcoind", version: "0.20.1" }, { id: "lnd", version: "0.11.1" }],
    website: "https://btcpayserver.org",
    port: 6007
  },
  {
    id: "thunderhub",
    category: "Lightning",
    name: "Thunderhub",
    version: "0.7.2",
    tagline: "Lightning node management for full control",
    description: "BTCPay is a non-custodial invoicing system which eliminates the involvement of a third-party. Payments with BTCPay go directly to your wallet, which increases the privacy and security. Your private keys are never uploaded to the server. There is no address re-use, since each invoice generates a new address deriving from your xpubkey.",
    developer: "BTCPay Foundation",
    repo: "https://github.com/btcpayserver/btcpayserver",
    gallery: ["1.png", "2.png", "3.png"],
    compatible: true,
    dependencies: [{ id: "bitcoind", version: "0.20.1" }, { id: "lnd", version: "0.11.1" }],
    website: "https://btcpayserver.org",
    port: 6008
  },
  {
    id: "sphinx",
    category: "Lightning",
    name: "Sphinx Relay",
    version: "0.7.2",
    tagline: "Chat & pay with Lightning",
    description: "BTCPay is a non-custodial invoicing system which eliminates the involvement of a third-party. Payments with BTCPay go directly to your wallet, which increases the privacy and security. Your private keys are never uploaded to the server. There is no address re-use, since each invoice generates a new address deriving from your xpubkey.",
    developer: "BTCPay Foundation",
    repo: "https://github.com/btcpayserver/btcpayserver",
    gallery: ["1.png", "2.png", "3.png"],
    compatible: true,
    dependencies: [{ id: "bitcoind", version: "0.20.1" }, { id: "lnd", version: "0.11.1" }],
    website: "https://btcpayserver.org",
    port: 6009
  }
];

let installedApps = [
  // {
  //   id: "mempool-space",
  //   name: "mempool.space",
  //   hiddenService: "mempooljhssdskhjshd.onion"
  // },
  // {
  //   id: "dojo",
  //   name: "Dojo",
  //   hiddenService: "dojoqoisbsxsdsduriw.onion"
  // },
  // {
  //   id: "btc-rpc-explorer",
  //   name: "BTC RPC Explorer",
  //   hiddenService: "btcrpcexplrerodhsjd.onion"
  // }
];

// Initial state
const state = () => ({
  installed: [],
  store: []
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
    // const data = await API.get(`${process.env.VUE_APP_MANAGER_API_URL}/v1/apps/installed`);
    // if (data && data.apps) {
    //   commit("setInstalledApps", data.apps);
    // }
    commit("setInstalledApps", installedApps);
  },
  async getAppStore({ commit, dispatch }) {
    dispatch("getInstalledApps");
    commit("setAppStore", appStore);
  },
  installFakeApp({ state }, app) {
    console.log(state);
    installedApps.push({
      id: app.id,
      name: app.name,
      hiddenService: 'testing.onion',
      port: app.port
    });
  },
  uninstallFakeApp({ dispatch }, appId) {

    const appIndex = installedApps.findIndex((app) => app.id === appId);
    installedApps = installedApps.slice(0, appIndex).concat(installedApps.slice(appIndex + 1, installedApps.length));

    dispatch("getAppStore");
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
