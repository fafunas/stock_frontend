<template>
  <v-main class="pa-4">
    <div class="d-flex justify-space-between mb-6 pt-4">
      <div>
        <v-autocomplete
          v-model="users"
          :items="users"
          item-value="uid"
          item-text="name"
          cache-items
          flat
          hide-no-data
          hide-details
          label="Usuario que Retira"
          solo-inverted
        >
        </v-autocomplete>
      </div>
      <div>
        <div>{{ date }}</div>
        <br />

        <div>{{ totalOut }}</div>
      </div>
    </div>
    <v-divider class="mb-10"></v-divider>
    <v-simple-table>
      <thead>
        <tr>
          <th>#</th>
          <th>Producto</th>
          <th>Stock Disponible</th>
          <th>Cantidad</th>
          <th>Observacion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in items" :key="i">
          <td scope="row">
            <v-icon small color="red" @click="deleteRow(i, item)">
              mdi-delete
            </v-icon>
          </td>
          <td>
            <v-autocomplete
              v-model="item.product_id"
              :items="products.productos"
              item-value="id"
              item-text="description"
              cache-items
              flat
              hide-no-data
              hide-details
              hide-selected
              label="Buscar Producto"
              solo-inverted
              return-object
              @change="stock(item.product_id)"
            >
            </v-autocomplete>
          </td>
          <td>
            <v-input v-model="item.stock">
              <div>{{ item.product_id.stock }}</div>
            </v-input>
          </td>
          <td>
            <v-text-field
              v-model="item.quantity"
              :rules="quantityRules"
              required
              type="Number"
            ></v-text-field>
          </td>
          <td>
            <v-text-field v-model="item.observation"></v-text-field>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <div class="d-flex justify-end mb-6 pa-4">
      <v-btn @click="addNewRow()" class="mx-1" fab dark color="indigo" small>
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
    </div>
    <div class="d-flex justify-center mb-6 pa-4">
      <v-btn class="mx-1" color="primary" @click="dialog = true">
        Registrar
      </v-btn>
    </div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5"> Confirmacion </v-card-title>
          <v-card-text
            >¿Esta Seguro que quiere registrar el egreso?</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Cancelar
            </v-btn>
            <v-btn color="green darken-1" text @click="confirmRegistration()">
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    items: [
      {
        product_id: "",
        quantity: "",
        observation: "",
        stock: "",
      },
    ],
    //stock:0,
    finalItem: {
      nro_in: "",
      items: [],
      user: "",
    },
    quantityRules: [
      (v) => !!v || "La cantidad es Obligatoria"
    ],
    dialog: false,
  }),

  mounted() {
    this.$store.dispatch("products/getAllProducts");
    this.$store.dispatch("wareHouse/getAllRegOut");
    this.$store.dispatch("users/getEnableUsers");
  },

  methods: {
    deleteRow(index, item) {
      var idx = this.items.indexOf(item);
      console.log(idx, index);
      if (idx > -1) {
        this.items.splice(idx, 1);
      }
    },

    addNewRow() {
      this.items.push({
        product_id: "",
        quantity: "",
        nro_rq: "",
        observation: "",
      });
    },

    confirmRegistration() {
      this.finalItem.nro_in = this.totalIn;
      this.finalItem.supplier = this.supplier;
      this.finalItem.user = "62c31bd49110e5f7d9ab1cac";
      this.items.forEach((e) => {
        e.product_id;
        this.finalItem.items.push({
          product: e.product_id,
          quantity: e.quantity,
          observation: e.observation,
          nro_rq: e.nro_rq,
        });
      });
      this.$store.dispatch("wareHouse/confirmNewIn", this.finalItem);
      console.log(this.finalItem);
      this.dialog = false;
      this.$router.go(this.$router.currentRoute);
      // console.log(this.finalItem)
    },

    stock(itemID) {
      //   this.items.stock= itemID.stock
      return this.products.productos.find((e) => (e._id = itemID)).stock;
      //       return console.log(itemID.stock)
    },
  },

  computed: {
    date() {
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;
      const formattedToday = dd + "/" + mm + "/" + yyyy;
      return formattedToday;
    },

    ...mapGetters({
      products: "products/products",
      users: "users/usersEnables",
      totalOut: "wareHouse/totalOut",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
