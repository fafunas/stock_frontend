<template>
  <div>
    <v-row>
      <v-col cols="2"> <SideBar class="sidebar" /></v-col>
      <v-col cols="10">
        <div class="d-flex align-start justify-space-around mb-6">
          <apexChart
            width="380"
            type="donut"
            :options="firstChart.chartOptions"
            :series="firstChart.series"
          ></apexChart>

          <apexChart
            width="380"
            type="donut"
            :options="secondChart.chartOptions"
            :series="secondChart.series"
          ></apexChart>
        </div>
        <v-row class="mt-4">
          <v-col><ReportTab /></v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ReportTab from "../components/reports/ReportTab.vue";
import SideBar from "../components/SideBar.vue";
import {mapState} from 'vuex'
export default {
  components: { ReportTab, SideBar },
  data: () => ({
    firstChart: {
      series: [],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Ingresos", "Egresos", "Prestamos"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    },
    secondChart: {
      series: [],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Sobre Stock", "Igual Stock", "Bajo Stock"],

        colors: ["#06d6a0", "#fcbf49", "#d62828"],

        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    },
  }),
  computed:{
    ...mapState({
      lessStock: (state) => state.products.lessStock,
      equalTo: (state) => state.products.equalTo,
      greater: (state)=> state.products.greaterThan,
      nro_in:(state)=> state.wareHouse.nro_in,
      nro_out:(state)=> state.wareHouse.nro_out,
      nro_lease:(state)=> state.wareHouse.nro_lease,
    })
  },
 

  beforeMount(){
    this.$store.dispatch('products/getDashboardProduct')
    this.$store.dispatch('wareHouse/getAllMovements')
    this.fillSeriesChart()
   },

  methods:{
    fillSeriesChart(){
      this.firstChart.series.push(this.nro_in);
      this.firstChart.series.push(this.nro_out);
      this.firstChart.series.push(this.nro_lease);
      this.secondChart.series.push(this.greater.greater);
      this.secondChart.series.push(this.equalTo.equalTo);
      this.secondChart.series.push(this.lessStock.lessthan)
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  padding: 0;
}
</style>
