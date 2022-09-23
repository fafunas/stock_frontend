<template>
  <div>
    <v-row>
      <v-col cols="2"> <SideBar class="sidebar" /></v-col>
      <v-col class="mt-6" cols="10">
        <v-row align="center" justify="space-around">
          <v-btn color="primary" @click="switchWarehoseLease"> Nuevo Prestamo </v-btn>
          <v-btn color="success" @click="switchLeaseList"> Devoluciones </v-btn> </v-row
        >
        <component :is="current"></component>
        
      </v-col>
    </v-row>
  </div>
</template>

<script>
import WarehoseLease from "../components/warehouse/WarehouseLease.vue";
import LeaseList from "../components/warehouse/LeaseList.vue";
import SideBar from "../components/SideBar.vue";
export default {
  components: { WarehoseLease, SideBar, LeaseList },
  data:()=>({
    current:""
  }),
  methods:{
    switchWarehoseLease(){
      this.current = WarehoseLease
    },
    switchLeaseList(){
      this.current = LeaseList
    }
  }
};
</script>

<style lang="scss" scoped></style>
