// Initial state
const state = () => ({
    name: 'Satoshi',
    isAuthenticated: window.sessionStorage.getItem("isAuthenticated") === "true"
});

// Functions to update the state directly
const mutations = {
    setAuthenticated(state, isAuthenticated) {
        window.sessionStorage.setItem("isAuthenticated", isAuthenticated);
        state.isAuthenticated = isAuthenticated;
    }
};

// Functions to get data from the API
const actions = {
    login({ commit }) {
        commit('setAuthenticated', true);
    },
    logout({ commit }) {
        commit('setAuthenticated', false);
    }
};

const getters = {
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
