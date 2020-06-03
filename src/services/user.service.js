import axios from 'axios'
import {requestService} from "./request.service";

export const userService = {
    login,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
};

function login(username, password) {
    return axios.post(`/users/authenticate`, { username, password })
        .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e))
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
            }
            return user;
        });
}

function register(user) {
    return axios.post(`/users/register`, user)
        .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e));
}

function getAll() {
    return axios.get(`/users`)
        .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e));
}

function getById(id) {
    return axios.get(`/users/${id}`)
        .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e));
}

function update(user) {
    return axios.put(`/users/${user.id}`, user)
        .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e));
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return axios.delete(`/users/${id}`)
        .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e));
}