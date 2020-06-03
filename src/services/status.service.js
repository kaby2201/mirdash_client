import axios from 'axios'
import { requestService } from "./request.service";

export const statusService = {
    getByRobotId,
    sendState,
    getAllStates
}

// Get all missions
function getByRobotId(id) {
    return axios.get(`/status/robotid=`+id)
        .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e))
}

function getAllStates() {
    return axios.get(`/status`)
        .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e));
}

window.getAllStates = getAllStates;

function sendState(robotId, state_id) {
    return axios.put(`/status/robotid=${robotId}`, {state_id:state_id})
        .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e));
}