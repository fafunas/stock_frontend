<template>
  <v-card>
    <v-data-table :items="totalLease"
    :headers="headers">
    <template v-slot:[`item.createdAt`]="{item}">
        {{momentDate(item.createdAt)}}
    </template>
    <template v-slot:[`item.return_date`]="{item}">
        {{returnDate(item.return_date)}}
    </template>
    <template v-slot:[`item.status`]="{item}">
        <v-chip
        :color="statusColor(item)" dark>{{statusMessage(item)}}</v-chip>
    </template>
    
    
     </v-data-table>
  </v-card>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  data: () => ({
    headers:[
        {text:'Nro Prestamo',
        value:'nro_lease'},
        {text:'Usuario',
        value:'user.name'},
        {text:'Articulo',
        value:'product.description'},
        {text:'Cantidad',
        value:'quantity'},
        {text:'Fecha Retiro',
        value:'createdAt'},
        {text:'Estimado Devolucion',
        value:'return_date'},
        {text:'Estado',
        value:'status'},
        
    ]
  }),
  methods: {
    momentDate(date) {
      return moment(date).format("DD/MM/YYYY hh:mm a");
    },
    returnDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    statusMessage(item){
        if(item.status){
            return "Completado"
        }else{
            return "Pendiente"
        }
    },
    statusColor(item){
        if(item.status){
            return "green"
        }else{
            return "red"
        }
    }
  },
  computed: {
    ...mapState({
      totalLease: (state) => state.wareHouse.totalLease,
    }),
  },
  mounted() {
    this.$store.dispatch("wareHouse/getAllRegLeases");
  },
};
</script>

<style lang="scss" scoped></style>
