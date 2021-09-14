<template>
  <div class="home">
    <Navbar />
    <!-- <input @keyup="fetchData(res)" type="text" name="" id=""> -->
    <div class="container">
      <div class="search card card-body">
          <h1>Pesquisar Usuários do GitHub</h1>
          <p class="lead">
            Digite um nome para encontrar usuários e repositórios
          </p>
          <input v-model="username" class="form-control" placeholder="Digite o nome de um usuário..." required />
          <button @click ="getUserGit" type="button" class="btn btn-dark">Buscar</button>
      </div>
      <div v-show="name.length !== 0" class="card col-4">
        <ul class="justify-content-start list-group list-group-flush">
            <li class="list-group-item"><img class="card-img-top" :src="this.photo" style="width:18rem"></li>
            <li class="list-group-item">Username: <span class="float-right">{{ this.name }}</span></li>
            <li class="list-group-item">Localização: <span class="float-right">{{ this.location }}</span></li>
            <li class="list-group-item">Seguidores: <span class="float-right">{{ this.followers }}</span></li>
            <li class="list-group-item">Seguindo:<span class="float-right">{{ this.following }}</span></li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { getUser } from '@/services';
import Navbar from '@/components/Navbar';

export default {
  name: 'Home',
  data(){
    return {
      username: '',
      name: '',
      location: '',
      photo: '',
      followers: 0,
      following: 0,
    }
  },
  components: {
    Navbar,
  // },
  // mounted() {
  //   this.fetchData()
  },
  methods: {
    getUserGit() {
      getUser(this.username).then( (res) => {
        this.getData(res.data);
        console.log(res.data.avatar_url)
        console.log(res.data.login);
        console.log(res.data.location);
        console.log(res.data.followers);
        console.log(res.data.following);
      })
    },

    getData(data){
      this.name = data.name;
      this.location = data.location;
      this.photo = data.avatar_url;
      this.followers = data.followers;
      this.following = data.following;
    },
  },
}
</script>

<style scoped>
  .card {
    margin-bottom: 1rem;
  }
  .card li, span { 
    display: flex;
    justify-content: center;
  }

</style>
