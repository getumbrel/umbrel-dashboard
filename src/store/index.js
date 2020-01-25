import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Initial State
const state = {
  onboardingStep: 0,
  selectedWifi: ""
};

// Getters
const getters = {
  onboardingStep(state) {
    return state.onboardingStep
  },
  selectWifi(state) {
    return state.selectWifi;
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
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
});
