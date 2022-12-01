import axios from 'axios';

var api = axios.create({
    baseURL: process.env.REACT_APP_API_DOMAIN,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'API-Key': process.env.REACT_APP_API_KEY
    }
});

export default api;