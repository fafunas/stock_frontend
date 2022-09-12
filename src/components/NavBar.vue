<template>
       <v-app-bar
      app
      color="light-blue darken-2"
      dark
      fixed
    >
      <div class="d-flex align-center">
        <router-link to='/'><v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="../assets/logo.png"
          transition="scale-transition"
          width="150"
        /></router-link>
        
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="loggedIn"
         text
         @click="logout()"
      >
        <span class="mr-2">Logout</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
    export default {

     methods:{
         logout(){
             this.$store.dispatch('auth/logout')
             this.$router.push('/login')
         }
     },

      computed:{
        loggedIn(){
            return this.$store.state.auth.status.loggedIn;
        }
    },
        
    }
</script>

<style lang="scss" scoped>

</style>