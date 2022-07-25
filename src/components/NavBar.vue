<template>
       <v-app-bar
      app
      color="primary"
      dark
      fixed
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
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