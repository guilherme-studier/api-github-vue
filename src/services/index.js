import axios from 'axios';

export const getUser = (user = 'guilherme-studier') => {
    return axios ({
        method: 'get', 
        url: `https://api.github.com/users/${user}`,
    })
}