import axios from 'axios'
import {requestService} from "./request.service";

export const robotService = {
    getAll,
    add,
    deleteWithId
};

// Get all relisted robots
function getAll() {
    return axios.get(`/robots`)
        .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e))
}
window.getAll = getAll;
// Register new robot
function add(robot) {
    return axios.post(`/robots`, robot)
        .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e));
}

function deleteWithId(robotId) {
    return axios.delete(`/robots/${robotId}`)
        .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e));
}