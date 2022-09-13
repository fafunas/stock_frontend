<template>
  <div>
    <v-row>
      <v-col cols="2"> <SideBar class="sidebar" /></v-col>
      <v-col cols="10">
        <div class="d-flex align-start mb-6">
          <Card colorCard="yellow lighten-2"/>
          <Card colorCard="red lighten-2" />
          <Card colorCard="green lighten-2"/>
        </div>
        <v-row><Stock /></v-row>
        ></v-col
      >
    </v-row>
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import Stock from "../components/home/StockTable.vue";
import Card from "../components/home/DashboardCard.vue";

export default {
  name: "HomeView",

  components: { SideBar, Stock, Card },
};
</script>

<style scoped>
.sidebar {
  padding: 0;
}
</style>
