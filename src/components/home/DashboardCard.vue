<template>
  <div class="col-md-4 col-sm-12">
    <v-card :color="colorCard">
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" class="d-flex justify-end text" @click="lessStock()"><a> {{number}}</a></v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col cols="12" class="d-flex justify-end legend font-weight-normal"> {{text}}</v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
     props:{
        colorCard:{
            type: String,
        },
        number:{
            type: Number,
            default: 0
        },
        text:{
            type: String
        }
     },
     data:()=>({

     }),

     methods:{
        lessStock(){
            console.log("123")
        }
     }

};
</script>

<style lang="scss" scoped>
.text{
    color: white;
    font-size: 26px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.text a{
    color:white;
}
.legend{
    color: white;
}

</style>
