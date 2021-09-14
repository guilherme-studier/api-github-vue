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
          <input @keyup="getUser" class="form-control" placeholder="Digite o nome de um usuário..." required />
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
  components: {
    Navbar,
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getUser().then( (res) => {
        console.log(res.data.login);
        console.log(res.data.followers);
        console.log(res.data.following);
      })
    }
  },
}
</script>
