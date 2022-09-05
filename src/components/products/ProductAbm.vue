<template>
  <v-data-table
    :headers="headers"
    :items="products"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Product Panel</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Nuevo Articulo
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      label="Grupo"
                      v-model="editedItem.group"
                      :items="groupsGetter"
                      item-value="id"
                      item-text="cod"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      label="Tipo"
                      v-model="editedItem.type"
                      :items="typesGetter"
                      item-value="id"
                      item-text="cod"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.cod"
                      label="Codigo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Descripcion"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.stock_min"
                      label="Stock Minimo"
                      type="number"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col v-if="newOrEdit" cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.stock"
                      label="Stock"
                      type="number"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Esta seguro que desea deshabilitar el Producto?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon medium color="green" class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon medium color="red" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import authHeader from '@/services/login/auth_header'
import { mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Codigo",
        align: "start",
        sortable: false,
        value: "cod",
      },
      { text: "Grupo", value: "group.cod" },
      { text: "Tipo", value: "type.cod" },
      { text: "Descripcion", value: "description" },
      { text: "Stock Minimo", value: "stock_min" },
      { text: "Stock Actual", value: "stock" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    products: [],
    editedIndex: -1,
    editedItem: {
      group: "",
      type: "",
      cod:"",
      description: "",
      stock_min: "",
      stock: "",
    },
    defaultItem: {
      group: "",
      type: "",
      cod:"",
      description: "",
      stock_min: "",
      stock: "",
    },
  }),

  computed: {
    ...mapGetters({
      groupsGetter: "products/group",
      typesGetter: "products/types",
    }),
    

    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Articulo" : "Editar Articulo";
    },

    newOrEdit() {
      return this.editedIndex === -1 ? true : false;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.getProducts();
    this.$store.dispatch("products/getAllGroups");
    this.$store.dispatch("products/getAllTypes");
  },

  methods: {
    getProducts() {
      axios
        .get(process.env.VUE_APP_SERVER_URL + "products", {headers: authHeader()})
        .then((data) => {
          this.products = data.data.productos; //esto recibo del endpoint
          // console.table(data)
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    },


    //editar items
    editItem(item) {
      this.editedIndex = item.id;
      this.editedItem.group = item.group._id;
      this.editedItem.type = item.type._id;
      this.editedItem.description = item.description;
      this.editedItem.stock_min = item.stock_min;
      this.dialog = true;
    },

    //borrar item de la tabla
    deleteItem(item) {
      // this.editedIndex = this.user.indexOf(item);
      this.editedItem = item.id;
      this.dialogDelete = true;
      //  console.log(this.editedIndex)
      //  console.log(this.editedItem)
    },

    deleteItemConfirm() {
      axios
        .delete(process.env.VUE_APP_SERVER_URL + `product/${this.editedItem}`, {headers: authHeader()})
        .then((response) => {
          console.log(response.data);
          this.getProducts();
          this.closeDelete();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex === -1) {
        this.saveNew()
       // console.log("item a salvar", this.editedItem);
      } else {
        this.saveEdit()
        //console.log("item a salvar", this.editedItem);
      }
    },

    saveNew() {
      axios
        .post(process.env.VUE_APP_SERVER_URL + "products", this.editedItem,{headers: authHeader()})
        .then((response) => {
          console.log(response);
         this.getProducts();
          this.close();
          // console.log(this.editedItem)
        })
        .catch((err) => {
          console.log(err);
          //  console.log(this.editedItem)
        });
    },

    saveEdit() {
      axios
        .put(
          process.env.VUE_APP_SERVER_URL + `products/${this.editedIndex}`,
          this.editedItem,{headers: authHeader()}
        )
        .then((response) => {
          console.log(response.data);
          this.getProducts();
        })
        .catch((err) => {
          console.error(`${err}`);
        });
      this.close();
    },
  },
};
</script>
