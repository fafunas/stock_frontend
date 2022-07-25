<template>
  <v-card
    height="100vh"
    width="256"
    left

  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Panel
          </v-list-item-title>
          <v-list-item-subtitle>
            Usuario
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>


<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Ingreso', icon: 'mdi-home-import-outline'},
          { title: 'Egreso', icon: 'mdi-home-export-outline'},
          { title: 'Traspaso', icon: 'mdi-home-switch' },
          {title:'Productos', icon: 'mdi-alpha-p-circle-outline'},
          {title: 'Usuarios', icon: 'mdi-account'}
        ],
        right: null,
      }
    },
  }
</script>


<style scoped>

</style>