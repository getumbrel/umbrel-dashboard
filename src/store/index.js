import Vue from "vue";
import Vuex from "vuex";

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
  isDarkMode: userSelectedDarkMode
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
      document.body.style.background = "#ffffff";
      window.localStorage.setItem("isDarkMode", "false");
    } else {
      state.isDarkMode = true;
      document.body.style.background = "#1C1C26";
      window.localStorage.setItem("isDarkMode", "true");
    }
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
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
});
