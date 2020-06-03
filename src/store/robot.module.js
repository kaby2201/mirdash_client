import { robotService } from "../services/robot.service";
import { router } from '../router';

const state = {
    all: {}
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        robotService.getAll()
            .then(
                robots => commit('getAllSuccess', robots),
                error => commit('getAllFailure', error)
            )
    },
    add({ dispatch, commit }, robot) {
        commit('addRequest');

        robotService.add(robot)
            .then(() => {
                router.push('/robots');
                dispatch('alert/success', 'The robot was added successful ', { root: true });
            },
                error => {
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    remove({ dispatch }, robotId) {
        robotService.deleteWithId(robotId)
            .then(
                () => {
                    router.push('/robots').catch(() => undefined);
                    dispatch('alert/success', 'Robot removed', { root: true });
                },
                error => {
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    getAllRequest(state) {
        state.status = { isLoading: true }
    },
    getAllSuccess(state, robots) {
        state.all = { items: robots }
        state.status = { isLoading: false }
    },
    getAllFailure(state, error) {
        state.all = { error }
    },
    addRequest(state) {
        state.all = { adding: true }
    }
}

export const robots = {
    namespaced: true,
    state,
    actions,
    mutations
}