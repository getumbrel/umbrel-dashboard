// import API from "@/helpers/api";

const appStore = [
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
  },
  {
    id: "dojo",
    category: "Wallets",
    name: "Dojo",
    version: "0.7.2",
    tagline: "A simple explorer for the Bitcoin blockchain",
    description: "BTCPay is a non-custodial invoicing system which eliminates the involvement of a third-party. Payments with BTCPay go directly to your wallet, which increases the privacy and security. Your private keys are never uploaded to the server. There is no address re-use, since each invoice generates a new address deriving from your xpubkey.",
    developer: "BTCPay Foundation",
    repo: "https://github.com/btcpayserver/btcpayserver",
    gallery: ["1.png", "2.png", "3.png"],
    compatible: true,
    dependencies: [{ id: "bitcoind", version: "0.20.1" }, { id: "lnd", version: "0.11.1" }],
    website: "https://btcpayserver.org",
  }
];

const installedApps = [
  {
    id: "btcpays",
    name: "BTCPay Server",
    hiddenService: "btcpayuiuewndsokhdj.onion"
  },
  {
    id: "mempool-space",
    name: "mempool.space",
    hiddenService: "mempooljhssdskhjshd.onion"
  },
  {
    id: "dojo",
    name: "Dojo",
    hiddenService: "dojoqoisbsxsdsduriw.onion"
  },
  {
    id: "btc-rpc-explorer",
    name: "BTC RPC Explorer",
    hiddenService: "btcrpcexplrerodhsjd.onion"
  }
];

// Initial state
const state = () => ({
  installed: [],
  store: []
});

// Functions to update the state directly
const mutations = {
  setInstalledApps(state, apps) {
    state.installed = apps;
  },
  setAppStore(state, appStore) {
    const installedApps = state.installed;
    for (let installedApp of installedApps) {
      const appIndex = appStore.findIndex((app) => app.id === installedApp.id);
      appStore[appIndex] = {
        ...appStore[appIndex],
        isInstalled: true
      };
    }
    console.log(appStore);
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
