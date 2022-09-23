<template>
  <v-main>
    <v-data-table
      :headers="headers"
      :items="allLease"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:[`item.createdAt`]="{ item }">
        {{ momentDate(item.createdAt) }}
      </template>
      <template v-slot:[`item.return_date`]="{ item }">
        {{ momentDate(item.createdAt) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon medium color="green" class="mr-2" @click="returnToStock(item)">
          mdi-keyboard-return
        </v-icon>
        <v-icon medium color="red" @click="disableLease(item)">
          mdi-close-octagon
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="550px">
      <v-card>
        <v-card-title class="text-h5"
          >Indique la cantidad de Articulo que devuelve</v-card-title
        >
        <v-card-text class="text-center">{{ productDialog }}</v-card-text>
        <div class="d-flex justify-center">
          <v-text-field filled rounded dense type="number" v-model="quantity">
          </v-text-field>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="confirmReturn">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDisable" max-width="550px">
      <v-card>
        <v-card-title class="text-h5"
          >¿Confirma que utilizo todos los Articulos?</v-card-title
        >
        <v-card-text class="text-center text-h6">{{ productDialog }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDisable = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="confirmdisable">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
import authHeader from '@/services/login/auth_header'
import { mapState } from "vuex";
import moment from "moment";
import axios from 'axios';
export default {
  data: () => ({
    dialog: false,
    dialogDisable: false,
    headers: [
      { text: "Nro", value: "nro_lease" },
      { text: "Usuario", value: "user.name" },
      { text: "Articulo", value: "product.description" },
      { text: "Cantidad", value: "quantity" },
      { text: "Fecha Retiro", value: "createdAt" },
      { text: "Fecha Estimada Devolucion", value: "return_date" },
      { text: "Observacion", value: "observation" },
      { text: "Accion", value: "actions" },
    ],
    productDialog: "",
    withdrawn: "",
    quantity: "",
    prodID: "",
    itemIndex: "",
    editItem: {
      productID: "",
      quantity: "",
    },
  }),
  mounted() {
    this.$store.dispatch("wareHouse/getAllRegLease");
  },
  computed: {
    ...mapState({
      allLease: (state) => state.wareHouse.totalLease,
    }),
  },
  methods: {
    momentDate(date) {
      return moment(date).format("DD/MM/YYYY hh:mm a");
    },
    returnToStock(item) {
      this.dialog = true;
      this.itemIndex = item._id;
      this.productDialog = item.product.description;
      this.prodID = item.product.id;
      this.withdrawn = item.quantity;
    },
    confirmReturn() {
      if (this.quantity > this.withdrawn) {
        this.errorAlert();
      } else {
        this.editItem.quantity = this.quantity;
        this.editItem.productID = this.prodID;
        this.saveReturn()
        this.dialog= false
      }
    },
    disableLease(item) {
        this.dialogDisable= true;
      this.itemIndex = item._id;
      this.productDialog = item.product.description;
      console.log(this.itemIndex)
    },
    confirmdisable(){
        this.saveDisableLease()
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
        text: "No puede ingresar mas de lo que retiro",
      });
    },

    saveReturn(){
        axios
        .put(
          process.env.VUE_APP_SERVER_URL + `warehouse/lease/return/${this.itemIndex}`,
          this.editItem,{headers: authHeader()}
        )
        .then((response) => {
          console.log(response.data);
          this.$router.go(this.$router.currentRoute);
          
        })
        .catch((err) => {
          console.error(`${err}`);
        });
    },
    saveDisableLease(){
        axios
        .put(
          process.env.VUE_APP_SERVER_URL + `warehouse/lease/${this.itemIndex}`,
          this.editItem,{headers: authHeader()}
        )
        .then((response) => {
          console.log(response.data);
          this.$router.go(this.$router.currentRoute);

          
        })
        .catch((err) => {
          console.error(`${err}`);
        });
    }
  },
};
</script>

<style lang="scss" scoped></style>
