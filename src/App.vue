<template>
  <v-app>
    <NavBar/>
    <v-main>
      <router-view/>
    </v-main>
        <AlertComponet class="alert"/>
  </v-app>
</template>

<script>

import NavBar from './components/NavBar.vue'
import AlertComponet from "./components/AlertComponet.vue"

export default {

  components:{NavBar,AlertComponet},
  name: 'App',

  data: () => ({
    //
  }),

  
  //Si no esta el token lo envia al login
  // created(){
  //   if (!this.loggedIn){
  //           this.$router.push('/login')
  //       }else{
  //         this.$$router.push('/')
  //       }
  // }
};
</script>
