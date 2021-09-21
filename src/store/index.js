import { createStore } from 'vuex'

import { getUser, getRepos } from '@/services' 

export default createStore({
  state: {
    userData:{},
    reposData: {},

    loading: false,
    error: false, 
  },
  mutations: {
    SET_USER(state, user) {
      state.userData = user;
    },
    SET_REPOS(state, repos) {
      state.reposData = repos;
    },
    SET_LOADING(state, value) {
      state.loading = value;
    },
    SET_ERROR(state, value) {
      state.error = value;
    }
  },
  actions: {
    setUserGit({commit}, username) {
      commit('SET_ERROR', false);
      
      getUser(username).then((res) => {
        commit('SET_LOADING', true);
        commit('SET_USER', res.data);
      })
        .catch(e => {
        console.log(e)
        commit('SET_ERROR', true);
        // console.log('erro')
      })
        .finally(() => {
          commit('SET_LOADING', false);
      })
      
      getRepos(username).then((res) => {
        commit('SET_REPOS', res.data);
      })
        .catch(e => {
        console.log(e)
        commit('SET_ERROR', true);
        // console.log('erro')
        })
        .finally(() => {
          commit('SET_LOADING', false);
        });
    }, 

  },
  getters: {
    getterUserData: state => state.userData,
    getterReposData: state => state.reposData,

    getterLoadingFinish: state => state.loading,
    getterError: state => state.error
  },
})
