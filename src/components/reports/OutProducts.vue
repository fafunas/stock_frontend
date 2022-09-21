<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="totalOpOut"
      show-expand
      item-key="nro_out"
    >
      <template v-slot:expanded-item="{ item }">
                <table class="table">
            <thead>
                <tr>
                    <th class="text-left">Producto</th>
                    <th class="text-left">Cantidad</th>
                    <th class="text-left">Observacion</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in item.items" :key="i._id">
                    <td class="table-td">{{i.product.description}}</td>
                    <td class="table-td">{{i.quantity}}</td>
                    <td class="table-td">{{i.observation}}</td>
                </tr>
            </tbody>
        </table>
      </template>
      <template v-slot:[`item.createdAt`]="{item}">
         {{momentDate(item.createdAt)}}

      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import moment from 'moment'
import { mapState } from "vuex";
export default {
  data: () => ({
    headers: [
      {
        text: "N° Ingreso",
        value: "nro_out",
      },
      {
        text: "Fecha",
        value: "createdAt",
      },
      {
        text: "Usuario",
        value: "user.name",
      },
      { text: '', value: 'data-table-expand' },
    ],
  }),
  computed: {
    ...mapState({
      totalOpOut: (state) => state.wareHouse.totalOut,
    }),
  },

  methods:{
    momentDate(date){
        return moment(date).format('DD/MM/YYYY hh:mm a')
    }
  },

  mounted() {
    this.$store.dispatch("wareHouse/getAllOut");
  },
};
</script>

<style lang="scss" scoped>
.table-td {
  padding: 0px 5px;
}

.table {
  width: 500px;
}
</style>