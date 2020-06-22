import API from "@/helpers/api";

// Initial state
const state = () => ({
  loading: true,
  unit: "sats", //sats or btc
  api: {
    operational: false,
    version: ""
  },
  managerApi: {
    operational: false,
    version: ""
  },
  btcprice: 0,
  fiatUnitSymbol: "",
  fiatUnits: ""
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
  btcprice(state, usd) {
    state.btcprice = usd;
  },
  fiatUnitSymbol(state, symbol) {
    state.fiatUnitSymbol = symbol;
  },
  fiatUnits(state, fiatunit) {
    state.fiatUnits = fiatunit;
  }
};

// Functions to get data from the API
const actions = {
  async fetchUnit({ commit }) {
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

  async getPrice({ commit, state }) {
    const info = await API.get(`${process.env.VUE_APP_MANAGER_API_URL}/v1/account/info`);
    const currency = info['stateCurrencyPreference'] || 'USD';
    var currencySymbol = currency; // default to the currency symbol
    switch (currency) {
      case "THB":
        currencySymbol = "฿";
        break;
      case "EUR":
        currencySymbol = "€";
        break;
      case "GBP":
        currencySymbol = "£";
        break;
      case "INR":
        currencySymbol = "₹";
        break;
      case "KRW":
        currencySymbol = "₩";
        break;
      case "CNY":
        currencySymbol = "元";
        break;
      case "USD":
        currencySymbol = "$";
        break;
      default:
        currencySymbol = currency;
        break;
    }
    console.log("My currency preference is " + currency.toString() + " and the symbol is " + currencySymbol.toString());
    commit("fiatUnitSymbol", currencySymbol);
    commit("fiatUnits", currency);

    const price = await API.get(
      "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=" + (currency).toString()
    );

    if (price) {
      commit("btcprice", price[state.fiatUnits]);
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
