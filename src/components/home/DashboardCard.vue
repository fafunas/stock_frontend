<template>
  <div class="col-md-4 col-sm-12">
    <v-card :color="colorCard">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              class="d-flex justify-end text"
              @click="itemsGrid()"
              ><a> {{ number }}</a></v-col
            >
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col
              cols="12"
              class="d-flex justify-end legend font-weight-normal"
            >
              {{ text }}</v-col
            >
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    colorCard: {
      type: String,
    },
    number: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
    },
    fillDialog: {
      type: String,
    },
  },
  data: () => ({
    //items: [],
  }),
  computed: {
    ...mapState({
      lessProducts: (state) => state.products.lessStockProducts,
      equalProducts: (state) => state.products.equalToProducts,
    }),
  },

  methods: {
    itemsGrid() {
      if (this.fillDialog === "red") {
        this.$store.dispatch("products/getDashboardLessProduct");
        this.$store.dispatch("dialog/SET_DIALOG");
      } else {
        this.$store.dispatch("products/getDashboardSameProduct");
        this.$store.dispatch("dialog/SET_DIALOG");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text {
  color: white;
  font-size: 26px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.text a {
  color: white;
}
.legend {
  color: white;
}
</style>
