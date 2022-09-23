<template>
  <v-main class="pa-4">
    <div class="d-flex justify-space-between mb-6 pt-4">
      <div>
        <v-autocomplete
          v-model="user"
          :items="users"
          item-value="uid"
          item-text="name"
          cache-items
          flat
          hide-no-data
          hide-details
          label="Usuario"
          solo-inverted
        >
        </v-autocomplete>
      </div>
      <div>
        <div>{{ today }}</div>
        <br />

        <div>Nº Prestamo: {{ totalLease }}</div>
      </div>
    </div>
    <v-divider class="mb-10"></v-divider>
    <v-simple-table fixed-header height="300px">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Stock Disponible</th>
          <th>Cantidad</th>
          <th>Fecha Devolucion</th>
          <th>Observacion</th>
        </tr>
      </thead>
      <tbody>
        <td>
          <v-autocomplete
            v-model="product_id"
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
          >
          </v-autocomplete>
        </td>
        <td>
          <v-input v-model="products.productos.stock">
            <div class="text-right">{{ product_id.stock }}</div>
          </v-input>
        </td>
        <td>
          <v-text-field
            v-model="quantity"
            :rules="quantityRules"
            required
            type="Number"
          ></v-text-field>
        </td>
        <td>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="return_date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="return_date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="return_date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(return_date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </td>
        <td>
          <v-text-field v-model="observation"></v-text-field>
        </td>
      </tbody>
    </v-simple-table>
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
            >¿Esta seguro que quiere registrar el prestamo?</v-card-text
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
    product_id: "",
    quantity: "",
    observation: "",
    return_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    date: "",
    user: "",
    dialog: false,
    quantityRules: [(v) => !!v || "La cantidad es Obligatoria"],
    menu: false,
    modal: false,
    menu2: false,
    finalItem: {},
  }),

  mounted() {
    this.$store.dispatch("products/getAllProducts");
    this.$store.dispatch("users/getEnableUsers");
    this.$store.dispatch("wareHouse/getTotalLease");
    //console.log("que trae",this.totalLease)
  },

  methods: {
    checkStock() {
      if (this.quantity > this.product_id.stock) {
        return false;
      } else {
        return true;
      }
    },
    confirmAlert() {
      this.$store.dispatch("notifications/SET_NOTIFICATION", {
        type: "success",
        text: "Registro Guardado Correctamente",
      });
    },
    errorAlert() {
      this.$store.dispatch("notifications/SET_NOTIFICATION", {
        type: "warning",
        text: "Estas seleccionando mas que lo disponible",
      });
    },

    confirmRegistration() {
      if (!this.checkStock()) {
        this.finalItem.lenght = 0;
        this.errorAlert();
      } else {
        this.finalItem.nro_lease = this.totalLease;
        this.finalItem.product = this.product_id.id;
        this.finalItem.quantity = this.quantity;
        this.finalItem.observation = this.observation;
        this.finalItem.user = this.user;
        this.finalItem.return_date = this.return_date;
        this.$store.dispatch("wareHouse/confirmNewLease", this.finalItem);
        this.dialog = false;
        this.confirmAlert();
        this.$router.go(this.$router.currentRoute);
        console.log(this.finalItem);
      }
    },
  },

  computed: {
    today() {
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;
      const formattedToday = yyyy + "-" + mm + "-" + dd;
      return formattedToday;
    },

    ...mapGetters({
      products: "products/products",
      users: "users/usersEnables",
      totalLease: "wareHouse/totalLease",
    }),
  },
};
</script>

<style lang="scss" scoped>
td {
  padding: 0px 10px;
}
</style>
