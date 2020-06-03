import { requestService } from "../services";
import { userService } from '../services';
import { router } from '../router';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });

        userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        requestService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);

        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/usermanager');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    update({ dispatch, commit }, userUpdateObj) {
        userService.update({ ...userUpdateObj.form, id: userUpdateObj.id })
            .then(
                user => {
                    commit('updateSuccess', user);
                    setTimeout(() => {
                        dispatch('alert/success', 'Update successful', { root: true });
                        location.reload();
                    })
                }, error => {
                    commit('updateFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            )
    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
        console.log(user)
    },
    registerSuccess(state, user) {
        state.status = {};
        console.log(user)
    },
    registerFailure(state, error) {
        state.status = {};
        console.log(error)
    },
    updateRequest(state, _user) {
        state.status = { updating: true, updateSuccess: state.status.updateSuccess };
    },
    updateSuccess(state, _user) {
        state.status.updateSuccess(true);
        state.status = {};
    },
    updateFailure(state, _error) {
        state.status.updateSuccess(false);
        state.status = {};
        console.log(_error)
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};