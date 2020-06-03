import { statusService } from "../services/status.service";

const state = {
    all: {}
};

const actions = {
    getByRobotId({ commit }, id) {
        commit('getAllRequest');

        statusService.getByRobotId(id)
            .then(
                status => commit('getAllSuccess', status),
                error => commit('getAllFailure', error)
            )
    },
    sendState({ dispatch }, { robotId, state_id }) {
        statusService.sendState(robotId, state_id)
            .then(
                () => {
                    dispatch('alert/success', 'Robot state put', { root: true });
                },
                error => {
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    getAll({ commit }) {
        statusService.getAllStates()
            .then(
                states => { commit('getAllSuccess', states) },
                error => { commit('getAllFailure', error) }
            );
    }
}

const mutations = {
    getAllRequest(state) {
        state.status = { isLoading: true }
    },
    getAllSuccess(state, status) {
        state.all = { items: status }
        state.status = { isLoading: false }
    },
    getAllFailure(state, error) {
        state.all = { error }
    },
    addRequest(state) {
        state.all = { adding: true }
    }
}

export const status = {
    namespaced: true,
    state,
    actions,
    mutations
}
