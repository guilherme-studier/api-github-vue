import axios from 'axios';

export const getUser = (user) => {
    return axios ({
        method: 'get', 
        url: `https://api.github.com/users/${user}`,
    })
}