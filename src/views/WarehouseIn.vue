<template>
  <div>
    <v-row>
      <v-col cols="2"> <SideBar class="sidebar" /></v-col>
      <v-col cols="10"><WarehouseIn/></v-col>
    </v-row>
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import WarehouseIn from "../components/warehouse/WarehouseIn.vue"

export default {
  name: "WareHouse",

  components: { SideBar, WarehouseIn },
};
</script>

<style scoped>
.sidebar {
  padding: 0;
}
</style>
