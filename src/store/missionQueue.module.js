import {missionQueueService} from "../services/missionQueue.services";


const state = {
    all: {}
};

const actions = {
    getMissionQueue({commit}, id) {
        commit('getAllRequest');
        missionQueueService.getMissionQue(id)
            .then(
                missionQueue => commit('getQueueSuccess', missionQueue),
                error => commit('getQueueFailure', error)
            )
    },
    addMissionToQueue({commit}, payload) {
        missionQueueService.addMissionToQueue(payload)
            .then(
                missionQueue => commit('AddMissionSuccess', missionQueue),
                error => commit('AddMissionFailure', error),
            )
    }
}

const mutations = {
    getAllRequest(state) {
        state.status = { isLoading: true }
    },
    getQueueSuccess(state, missionQueue) {
        state.all = { missionQueue: missionQueue }
        state.status = { isLoading: false }
    },
    getQueueFailure(state, error) {
        state.all = { error }
    },
    AddMissionSuccess(state, missionQueue) {
        state.all = { missionQueue: missionQueue }
    },
    AddMissionFailure(state, error) {
        state.all = { error: error }
    }
}


export const missionQueue = {
    namespaced: true,
    actions,
    mutations,
    state
};