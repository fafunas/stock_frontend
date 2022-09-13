<template>
  <v-card height="100vh" width="256" left>
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Panel </v-list-item-title>
         
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item  link>
          <v-list-item-icon class="mr-2">
            <v-icon>mdi-home-import-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <router-link to="/warehouse/in">Ingreso</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item  link>
          <v-list-item-icon class="mr-2">
            <v-icon>mdi-home-export-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <router-link to="/warehouse/out">Egreso</router-link>
          </v-list-item-content>
          </v-list-item>
          <v-list-item  link>
          <v-list-item-icon class="mr-2">
            <v-icon>mdi-home-switch</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            
            <router-link to="/warehouse/switch">Traspaso</router-link>
          </v-list-item-content>
          </v-list-item>
          <v-list-item  link>
          <v-list-item-icon class="mr-2">
            <v-icon>mdi-share</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            
            <router-link to="/warehouse/lease">Prestamo</router-link>
          </v-list-item-content>
          </v-list-item>
          
          <v-list-item v-if="userRol" link>
          <v-list-item-icon class="mr-2">
            <v-icon>mdi-alpha-p-circle-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <router-link to="/product">Productos</router-link>
          </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="userRol"  link>
          <v-list-item-icon class="mr-2">
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <router-link to="/panel">Usuarios</router-link>
          </v-list-item-content>
          </v-list-item>
          
        
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
     
      right: null,
    };
  },

  computed:{
    userRol(){
      if (this.$store.state.users.userRol === "ADMIN_ROLE"){
        return true
      }else{
        return false
      }
      
    }
  }
};
</script>

<style scoped>
a:link {
  text-decoration: none;
  color: black;
}

a {
  text-decoration: none;
  color: black !important;
}
</style>
