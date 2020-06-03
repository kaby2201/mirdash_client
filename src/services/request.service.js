/*
    The requestService is extended to work as base, for all common service operations
 */

export const requestService = {
    handleResponse,
    logout
};

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response, error) {
    if (error !== null) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            location.reload(true);
        }
        return Promise.reject(response.data.message || `${response.statusText}-${error.message}: ${response.data}`);
    } else {
        return Promise.resolve(response.data);
    }
}