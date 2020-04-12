import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);


//Dark Mode
let userSelectedDarkMode = false;

//if dark mode has never been turned on, then get system preference. Else get user's setting.
if (!window.localStorage.getItem("isDarkMode") && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  userSelectedDarkMode = true;
} else {
  userSelectedDarkMode = window.localStorage.getItem("isDarkMode") === "true";
}

// Initial State
const state = {
  onboardingStep: 0,
  selectedWifi: "",
  isDarkMode: userSelectedDarkMode,
  isMobileMenuOpen: true,
  wallet: {
    balance: {
      onChain: 0,
      offChain: 0
    },
    unit: 'Sats' //Sats or BTC
  }
};

// Getters
const getters = {
  onboardingStep(state) {
    return state.onboardingStep
  },
  selectWifi(state) {
    return state.selectWifi;
  },
  isDarkMode(state) {
    return state.isDarkMode
  },
  isMobileMenuOpen(state) {
    return state.isMobileMenuOpen;
  },
  getWalletBalance(state) {
    return state.wallet.balance.onChain + state.wallet.balance.offChain;
  },
  getWalletUnit(state) {
    return state.wallet.unit;
  }
}

// Mutations
const mutations = {
  nextStep(state) {
    state.onboardingStep++
  },
  prevStep(state) {
    state.onboardingStep--
  },
  selectWifi(state, networkName) {
    state.selectedWifi = networkName;
  },
  toggleDarkMode(state) {
    if (state.isDarkMode) {
      state.isDarkMode = false;
      // document.body.style.background = "#ffffff";
      document.body.style.background = "#F7F9FB";
      window.localStorage.setItem("isDarkMode", "false");
    } else {
      state.isDarkMode = true;
      document.body.style.background = "#1C1C26";
      window.localStorage.setItem("isDarkMode", "true");
    }
  },
  toggleMobileMenu(state) {
    //disable body's scrolling on menu open
    if (!state.isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      state.isMobileMenuOpen = true;
    } else {
      document.body.style.overflow = "auto";
      state.isMobileMenuOpen = false
    }
  },
  updateWalletBalance(state, { balance, type }) {
    if (type === 'onChain') {
      state.wallet.balance.onChain = balance;
    } else if (type === 'offChain') {
      state.wallet.balance.offChain = balance;
    }
  },
  changeWalletUnit(state, unit) {
    state.wallet.unit = unit;
  }
}

// Actions
const actions = {
  nextStep(context) {
    context.commit('nextStep');
  },
  prevStep(context) {
    context.commit('prevStep');
  },
  selectWifi(context, networkName) {
    context.commit('selectWifi', networkName);
  },
  triggerDarkMode(context) {
    context.commit('toggleDarkMode');
  },
  toggleMobileMenu(context) {
    context.commit('toggleMobileMenu');
  },
  // updateWalletBalance(context, newBalance) {
  //   context.commit('updateWalletBalance', newBalance, 'offChain');
  // },
  changeWalletUnit(context, unit) {
    context.commit('changeWalletUnit', unit);
  },
  fetchWalletBalance(context) {
    axios
      .get(`v1/lnd/wallet/btc`)
      .then(res => {
        const { totalBalance } = res.data;
        context.commit('updateWalletBalance', { balance: Number(totalBalance), type: 'onChain' });
      })
      .catch(error => {
        console.log(error);
        alert(error);
      })
      .finally(() => {
        // this.state.loading = false;
      });

    axios
      .get(`v1/lnd/wallet/lightning`)
      .then(res => {
        const { balance } = res.data;
        context.commit('updateWalletBalance', { balance: Number(balance), type: 'offChain' });
      })
      .catch(error => {
        console.log(error);
        alert(error);
      })
      .finally(() => {
        // this.state.loading = false;
      });
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
});
