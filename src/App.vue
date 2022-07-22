<template>
  <v-app>
    <NavBar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import NavBar from './components/NavBar.vue'

export default {

  components:{NavBar},
  name: 'App',

  data: () => ({
    //
  }),

  
  //Si no esta el token lo envia al login
  created(){
    if (!this.loggedIn){
            this.$router.push('/login')
        }
  }
};
</script>
