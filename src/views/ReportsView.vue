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
export default {
  components: { ReportTab, SideBar },
  data: () => ({
    firstChart: {
      series: [44, 55, 13],
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
      series: [44, 55, 13],
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
};
</script>

<style lang="scss" scoped>
.sidebar {
  padding: 0;
}
</style>
