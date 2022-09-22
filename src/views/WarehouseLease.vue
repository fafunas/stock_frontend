<template>
    <div>
    <v-row>
      <v-col cols="2"> <SideBar class="sidebar" /></v-col>
      <v-col cols="10"><WarehoseLease/></v-col>
    </v-row>
  </div>
</template>

<script>
import WarehoseLease from '../components/warehouse/WarehouseLease.vue'
import SideBar from '../components/SideBar.vue'
    export default {
        components:{WarehoseLease,SideBar}
    }
</script>

<style lang="scss" scoped>

</style>