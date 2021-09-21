/* eslint-disable no-unused-vars */
<template>
  <div class="home">
    <Navbar />
    <!-- CARD - PESQUISA -->
    <div class="container">
      <div class="search card card-body">
        <h1>Pesquisar Usuários do GitHub</h1>
        <p class="lead">
          Digite um nome para encontrar usuários e repositórios
        </p>
        <input v-model="username" @keypress.enter="setUserGit(username)" class="form-control" placeholder="Digite o nome de um usuário..." required autofocus
        />
        <button @click="setUserGit(username)" type="button" class="btn btn-dark">Buscar</button>
      </div>
    </div>
    <!-- CARD - PROFILE -->
    <div class="container">
      <!-- Spinner - Loading -->
      <Loading v-show="loading" />
      <!-- Tratatamento para erro -->
      <Erro v-show="error" />
      <div class="row">
        <!-- Coluna-Perfil -->
        <div class="col-4 column">
          <div v-show="name.length !== 0">
            <div class="card">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <img class="card-img-top" :src="this.photo" />
                </li>
                <li class="list-group-item">
                  <p>Username: {{ this.name }}</p>
                </li>
                <li class="list-group-item">
                  <p>Localização: {{ this.location }}</p>
                </li>
                <li class="list-group-item">
                  <p>Seguidores: {{ this.followers }}</p>
                </li>
                <li class="list-group-item">
                  <p>Seguindo: {{ this.following }}</p>
                </li>
                <li class="list-group-item">
                  <a :href="this.url" target="_blank"><button type="button" class="btn btn-dark">Ver Perfil</button></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- Coliuna Repositório -->
        <div class="col-8 column">
          <div v-show="name.length !== 0" class="card">
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between" v-for="item in repos" v-bind:key="item.id">
                <p><a :href="item.svn_url" class="float-right link-dark" target="_blank">{{ item.name }}</a><strong>{{ item.language }}</strong></p>
                <p>{{ moment(item.created_at).format('DD MMMM YYYY') }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import do Navbar
import Navbar from "@/components/Navbar";
// import do spinner de loading
import Loading from "@/components/Loading";
// import da tratativa de erro
import Erro from "@/components/Erro";
// Vuex
import { mapActions, mapGetters } from 'vuex'


// constante para trabalhar com a data de criação do repositório
// eslint-disable-next-line no-unused-vars
const moment = require('moment');

export default {
  name: "Home",
  data() {
    return {
      username: "",
      name: "",
      location: "",
      photo: "",
      followers: 0,
      following: 0,
      url: "",
      starred: "",
      repos: [],
      loading: false, 
      error: false,
      moment: moment,
    };
  },
  components: {
    Navbar,
    Loading,
    Erro,
  },
  computed: {
    ...mapGetters(['getterUserData' ,'getterReposData', 'getterLoadingFinish', 'getterError'])
  },
  watch: {
    getterUserData() {
      this.getUserData(this.getterUserData)
      // console.log(this.getterUserData)
    },
    getterReposData() {
      this.getReposData(this.getterReposData)
      // console.log(this.getterReposData)
    },
    getterLoadingFinish() {
      this.getLoadingFinish(this.getterLoadingFinish)
      // console.log(this.getterLoadingFinish)
    },
    getterError() {
      this.getError(this.getterError)
      // console.log(this.getterError)
    }
  },
  methods: {
    ...mapActions(['setUserGit']),
    // limpar dados após o loading
    getUserData(data) {
      this.username = '',
      this.name = data.name || data.login;
      this.location = data.location || '';
      this.photo = data.avatar_url || '';
      this.followers = data.followers || '';
      this.following = data.following || '';
      this.url = data.html_url || '';
      this.repos = data.repos_url || '';
      this.loading = true;
      this.error = false;
      // console.log('dados do usuário')
    },
    getReposData(data) {
      this.repos = data;
      this.error = false;
      // console.log('repositórios')
    },
    getLoadingFinish() {
      this.loading = false;
    },
    getError() {
      this.username = '';
      this.name = '';
      this.location = '';
      this.photo = '';
      this.followers = '';
      this.following = '';
      this.url = '';
      this.repos = '';
      this.error = true;
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 1rem;
}
.card li,
span {
  display: flex;
  justify-content: center;
}

strong {
  margin: 15px;
  font-size: 12px;
  font-weight: 900;
  color: gray;
}

img .card-img-top{
  width: 100%;
}
</style>
