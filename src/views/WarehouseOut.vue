<template>
  <div>
    <v-row>
      <v-col cols="2"> <SideBar class="sidebar" /></v-col>
      <v-col cols="10"><WarehouseOut/></v-col>
    </v-row>
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import WarehouseOut from "../components/warehouse/WarehouseOut.vue"


export default {
  name: "WareHouse",

  components: { SideBar, WarehouseOut },
};
</script>

<style scoped>
.sidebar {
  padding: 0;
}
</style>