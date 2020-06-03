import axios from 'axios'
import { requestService } from "./request.service";

export const missionQueueService = {
    getMissionQue,
    addMissionToQueue
}

function getMissionQue(id) {
    return axios.get(`/MissionQueuesResponse/robot=`+id)
        .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e))
}

function addMissionToQueue(payload) {
    let {mission, id} = payload;
    axios.post(`/MissionQueueRequest/robotId=`+id, mission)
        .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e))
    return axios.get(`/MissionQueuesResponse/robot=`+id)
        .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e))
    //return axios.post(`/MissionQueueRequest/robotId=`+id, mission)
    //    .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e))
}