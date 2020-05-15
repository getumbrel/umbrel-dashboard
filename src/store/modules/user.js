// Initial state
const state = () => ({
  name: "Satoshi",
  jwt: window.localStorage.getItem("jwt") ? window.localStorage.getItem("jwt") : ""
});

// Functions to update the state directly
const mutations = {
  setJWT(state, jwt) {
    window.localStorage.setItem("jwt", jwt);
    state.jwt = jwt;
  }
};

// Functions to get data from the API
const actions = {
  login({ commit }) {
    commit("setJWT", "true");
  },
  logout({ commit }) {
    commit("setJWT", "");
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
