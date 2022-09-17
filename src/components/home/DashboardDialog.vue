<template>
  <v-row>
    <v-col cols="auto">
      <v-dialog transition="scale-transition" max-width="600" v-model="dialog">
        <v-card>
          <v-card-title class="justify-center">Articulos</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-simple-table
              ><thead>
                <tr>
                  <th>Producto</th>
                  <th>Stock Minimo</th>
                  <th>Stock Actual</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in this.items" :key="item._id">
                  <td>{{ item.description }}</td>
                  <td>{{ item.stock_min }}</td>
                  <td>{{ item.stock }}</td>
                </tr>
              </tbody></v-simple-table
            ></v-card-text
          >
          <v-card-actions class="justify-end">
            <v-btn text @click="closeDialog()">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({}),
  mounted() {
    console.log("esto viene del dialog", this.items);
  },

  computed: {
    ...mapState({
      dialog: (state) => state.dialog.dialog,
      items: (state) => state.products.dialogProducts,
    }),
  },

  methods: {
    closeDialog() {
      this.$store.dispatch("dialog/END_DIALOG");
    },
  },
};
</script>

<style lang="scss" scoped></style>
