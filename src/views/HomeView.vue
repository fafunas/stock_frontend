<template>
  <div>
    <v-row>
      <v-col cols="2"> <SideBar class="sidebar" /></v-col>
      <v-col cols="10">
        <div class="d-flex align-start justify-space-around mb-6">
          <Card
            :number="lessStock.lessthan"
            text="Productos Por debajo del Minimo"
            colorCard="red"
            fillDialog="red"
          />
          <Card
            :number="equalTo.equalTo"
            text="Articulos proximos a agotarse"
            colorCard="yellow"
            fillDialog="yellow"
          />
        </div>
        <v-row><Stock /></v-row>
        </v-col
      >
    </v-row>
    <Dialog />
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import Stock from "../components/home/StockTable.vue";
import Card from "../components/home/DashboardCard.vue";
import Dialog from "../components/home/DashboardDialog.vue";
import { mapState } from "vuex";

export default {
  name: "HomeView",

  components: { SideBar, Stock, Card, Dialog },
  data: () => ({}),

  methods: {},
  computed: {
    ...mapState({
      lessStock: (state) => state.products.lessStock,
      equalTo: (state) => state.products.equalTo,
    }),
  },
  mounted() {
    this.$store.dispatch("products/getDashboardProduct");
  },
};
</script>

<style scoped>
.sidebar {
  padding: 0;
}
</style>
