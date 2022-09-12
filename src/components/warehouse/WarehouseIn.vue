<template>
  <v-main class="pa-4">
    <div class="d-flex justify-space-between mb-6 pt-4">
      <div>
        <v-autocomplete
          v-model="supplier"
          :items="suppliers[0]"
          item-value="_id"
          item-text="name"
          cache-items
          flat
          hide-no-data
          hide-details
          label="Proveedor"
          solo-inverted
        >
        </v-autocomplete>
      </div>
      <div>
        <v-text-field
            label="N° Remito"
            placeholder="N° Remito"
            outlined
            required
            v-model="referral"
            :rules="refeRule"
          ></v-text-field>
      </div>
      <div>
        <div>{{ date }}</div>
        <br />

        <div>{{totalIn}}</div>
      </div>
    </div>
    <v-divider class="mb-10"></v-divider>
    <v-simple-table>
      <thead>
        <tr>
          <th>#</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Nr Requerimiento</th>
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
              label="Buscar Producto"
              solo-inverted
            >
            </v-autocomplete>
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
            <v-text-field v-model="item.nro_rq" type="Number"></v-text-field>
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
      <v-btn class="mx-1" color="primary" @click="dialog= true">
         Registrar
      </v-btn>
    </div>
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      
      <v-card>
        <v-card-title class="text-h5">
          Confirmacion
        </v-card-title>
        <v-card-text>¿Esta Seguro que quiere registrar el ingreso?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="confirmRegistration()"
          >
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
        nro_rq: "",
        observation: "",
      },
    ],
    finalItem:{
        nro_in:"",
        items:[],
        user: "",
        supplier:"",
        referral:""        
        },
    supplier: "",
    referral:"",
    quantityRules: [(v) => !!v || "La cantidad es Obligatoria"],
    refeRule: [(v) => !!v || "Campo Obligatorio"],
    dialog : false
  }),

  mounted() {
    this.$store.dispatch("products/getAllProducts");
    this.$store.dispatch("supplier/getAllSuppliers")
    this.$store.dispatch("wareHouse/getAllRegIn")
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

    confirmRegistration(){
        this.finalItem.nro_in= this.totalIn
        this.finalItem.supplier = this.supplier
        this.finalItem.referral = this.referral
        this.finalItem.user = this.$store.state.users.id
        this.items.forEach(e=>{
            (e.product_id)
                this.finalItem.items.push({
                'product' : e.product_id,
                'quantity': e.quantity,
                'observation': e.observation,
                'nro_rq' : e.nro_rq
            })
            
            
        })
        this.$store.dispatch("wareHouse/confirmNewIn", this.finalItem)
        console.log(this.finalItem);
        this.dialog = false;
        this.$router.go(this.$router.currentRoute)
   
    }
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
      suppliers: "supplier/supplier",
      totalIn : "wareHouse/totalIn"
    }),
  },
};
</script>

<style lang="scss" scoped></style>
