const state = {
    type: null,
    message: null,
    isVisible: false
};

const actions = {
    success({ commit }, message) {
        commit('success', message);
    },
    error({ commit }, message) {
        commit('error', message);
    },
    clear({ commit }) {
        commit('clear');
    }
};

const mutations = {
    success(state, message) {
        state.type = 'alert-success';
        state.message = message;
        state.isVisible = true;
    },
    error(state, message) {
        state.type = 'alert-danger';
        state.message = message;
        state.isVisible = true;
    },
    clear(state) {
        state.type = null;
        state.message = null;
    }
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};