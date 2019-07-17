// This will set and delete Auth header for Axios requests depending on whether user is logged in or not

import axios from "axios";

const setAuthToken = token => {
    if (token) {
        // Apply authorization token to every request if loggin in
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        // Delete Auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;