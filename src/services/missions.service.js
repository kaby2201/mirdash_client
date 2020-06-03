import axios from 'axios'
import { requestService } from "./request.service";

export const missionsService = {
    getAllMissions
}

// Get all missions
function getAllMissions() {
    return axios.get(`/missions`)
        .then(r => requestService.handleResponse(r, null), e => requestService.handleResponse(e.response, e))
}