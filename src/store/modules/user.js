import API from "@/helpers/api";

// Initial state
const state = () => ({
  name: "Satoshi",
  jwt: window.localStorage.getItem("jwt") || "",
  registered: true,
  seed: []
});

// Functions to update the state directly
const mutations = {
  setJWT(state, jwt) {
    window.localStorage.setItem("jwt", jwt);
    state.jwt = jwt;
  },
  setRegistered(state, registered) {
    state.registered = registered;
  },
  setName(state, name) {
    state.name = name;
  },
  setSeed(state, seed) {
    state.seed = seed;
  }
};

// Functions to get data from the API
const actions = {
  async login({ commit }, password) {

    const { data } = await API.post(
      `${process.env.VUE_APP_SYSTEM_API_URL}/v1/account/login`,
      { password }
    );

    if (data && data.jwt) {
      commit("setJWT", data.jwt);
    }
  },

  logout({ commit }) {
    commit("setJWT", "");
  },

  async refreshJWT({ commit }) {
    const { data } = await API.post(`${process.env.VUE_APP_SYSTEM_API_URL}/v1/account/refresh`);
    if (data && data.jwt) {
      commit("setJWT", data.jwt);
    }
  },

  async registered({ commit }) {
    const { registered } = await API.get(`${process.env.VUE_APP_SYSTEM_API_URL}/v1/account/registered`);
    commit("setRegistered", !!registered);
  },

  async getSeed({ commit, state, dispatch }, plainTextPassword) {
    let rawSeed;

    //first check if user is registered or not 
    await dispatch("registered");

    //get user's stored seed if already registered
    if (state.registered && plainTextPassword) {
      rawSeed = await API.post(`${process.env.VUE_APP_SYSTEM_API_URL}/v1/account/seed`, {
        password: plainTextPassword
      }, false);
      if (rawSeed.data) {
        rawSeed = rawSeed.data;
      }
    } else {
      //get a new seed if new user 
      rawSeed = await API.get(`${process.env.VUE_APP_API_URL}/v1/lnd/wallet/seed`);
    }

    if (rawSeed && rawSeed.seed) {
      commit("setSeed", rawSeed.seed);
    }
  },

  async register({ commit, state }, { name, password, seed }) {
    if (name && password && seed && !state.registered) {
      const result = await API.post(`${process.env.VUE_APP_SYSTEM_API_URL}/v1/account/register`, {
        name,
        password,
        seed
      }, false);

      if (result && result.jwt) {
        commit("setJWT", result.jwt);
        commit("setRegistered", true)
        commit("setName", name);
        commit("setSeed", []); //remove seed from store
      }

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
