<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="primary"
      center-active
      dark
      icons-and-text
      fixed-tabs
     
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        Ingresos
        <v-icon>mdi-arrow-bottom-left-thin</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Egresos
        <v-icon>mdi-arrow-top-right-thin</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Prestamos
        <v-icon>mdi-backup-restore</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        :value="'tab-1'"
      >
       <ReportIn/>
      </v-tab-item>
      <v-tab-item
        :value="'tab-2'"
      >
      <TableOut/>
      </v-tab-item>
      <v-tab-item
        :value="'tab-3'"
      >
       3
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ReportIn from './ReportIn.vue'
import TableOut from './OutProducts.vue'
  export default {

    components:{
      ReportIn,
     TableOut
    },
    data () {
      return {
        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>