import axios from 'axios';

const getUser = (user) => {
    return axios ({
        method: 'get', 
        url: `https://api.github.com/users/${user}`,
    })
}

const getRepos = (user) => {
    return axios ({
        method: 'get', 
        url: `https://api.github.com/users/${user}/repos`,
    })
}

export {getUser, getRepos}
