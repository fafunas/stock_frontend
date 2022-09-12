<template>
  <div>
    <v-row>
      <v-col cols="2"> <SideBar class="sidebar" /></v-col>
      <v-col cols="10"><div>
        Conenedor de cards</div>
        <div><Stock/></div></v-col>
     
    </v-row>
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import Stock from "../components/home/StockTable.vue"


export default {
  name: "HomeView",

  components: { SideBar,Stock},
};
</script>

<style scoped>
.sidebar {
  padding: 0;
}
</style>
