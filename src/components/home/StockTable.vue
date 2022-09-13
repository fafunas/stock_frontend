<template>
<v-main class="pt-4">
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="productStock.productos"
      :search="search"
      
    >
    <template v-slot:[`item.stock`]= "{ item }">
      <v-chip
        :color="getColor(item)"
        dark
      >
        {{ item.stock }}
        
      </v-chip>
    </template></v-data-table>
  </v-card>
  </v-main>
</template>

<script>
import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Codigo',
            align: 'start',
         //   filterable: false,
            value: 'cod',
          },
          {
            text:'Producto',
            value:'description'
            
          },
          {
            text: 'Stock Minimo',
            value: 'stock_min',
            filterable: false,
          },
          {
            text: 'Stock Actual',
            value: 'stock',
            filterable: false,
          }
        ],
        
      }
    },

     mounted() {
    this.$store.dispatch("products/getAllProducts");
  //  console.log(this.productStock)
    
  },

  computed:{
    ...mapGetters({
      productStock : "products/products"
    }),
    
  },

  methods:{
    getColor(item){
      if (item.stock < item.stock_min) return 'red'
      else if (item.stock === item.stock_min) return 'yellow'
      else return 'green'
    }
  }



  }
</script>