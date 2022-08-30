<template>
  <div>
    <v-row>
      <v-col cols="2"> <SideBar class="sidebar" /></v-col>
      <v-col cols="10">Aca van a ir los dashboards -.-</v-col>
     
    </v-row>
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";


export default {
  name: "HomeView",

  components: { SideBar},
};
</script>

<style scoped>
.sidebar {
  padding: 0;
}
</style>
