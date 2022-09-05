<template>
  <v-data-table
    :headers="headers"
    :items="user"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>User Panel</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Nuevo Usuario
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
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.surname"
                      label="Apellido"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.dni"
                      label="DNI"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="newOrEdit" cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.password"
                      label="Password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col v-if="newOrEdit" cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                      type="mail"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedItem.rol"
                      :items="roles"
                      label="Rol"
                    ></v-select>
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
              >Esta seguro que desea deshabilitar al usuario?</v-card-title
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
import authHeader from '@/services/login/auth_header';
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Apellido", value: "surname" },
      { text: "Email", value: "email" },
      { text: "DNI", value: "dni" },
      { text: "Rol", value: "rol" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    roles:['ADMIN_ROLE', 'USER_ROLE'],
    user: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      surname: "",
      dni: "",
      rol: "",
      password: "",
    email: "",
    },
    defaultItem: {
      name: "",
      surname: "",
      dni: "",
      rol: "",
    },
    
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Usuario" : "Editar Usuario";
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
    this.getUsers();
  },

  methods: {
    getUsers() {
      axios
        .get(process.env.VUE_APP_SERVER_URL + "users", {headers:authHeader()})
        .then((data) => {
          this.user = data.data.usuarios; //esto recibo del endpoint
            //console.table(data.data.usuarios)
            //console.log(data.data.usuarios)
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    },

    editItem(item) {
      this.editedIndex = item.uid;
      this.editedItem.name = item.name;
      this.editedItem.surname = item.surname;
      this.editedItem.dni = item.dni;
      this.editedItem.rol = item.rol;
      this.dialog = true;
      //    console.log(item)
      //  console.log(this.editedIndex)
    },

    deleteItem(item) {
      // this.editedIndex = this.user.indexOf(item);
      this.editedItem = item.uid;
      this.dialogDelete = true;
      //  console.log(this.editedIndex)
      //  console.log(this.editedItem)
    },

    deleteItemConfirm() {
      axios
        .delete(process.env.VUE_APP_SERVER_URL + `users/${this.editedItem}`)
        .then((response) => {
          console.log(response.data);
          this.getUsers();
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
      if (this.editedIndex===-1){
        this.saveNew()
      }else{
        this.saveEdit()
      }
    },

    saveNew(){
      
      axios.post(process.env.VUE_APP_SERVER_URL + 'users', this.editedItem)
      .then((response)=>{
        console.log(response)
        this.getUsers()
        this.close()
        console.log(this.editedItem)
      })
      .catch((err)=>{
        console.log(err)
        console.log(this.editedItem)
      })
      
    },

    saveEdit(){
      axios
        .put(
          process.env.VUE_APP_SERVER_URL + `users/${this.editedIndex}`,
          this.editedItem
        )
        .then((response) => {
          console.log(response.data);
          this.getUsers();
        })
        .catch((err) => {
          console.error(`${err}`);
        });
      this.close();

    }
  },
};
</script>
