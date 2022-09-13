<template>
  <div class="col-md-4 col-sm-12">
    <v-card :color="colorCard">
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12"> Numero</v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col cols="4"> Dato</v-col>
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
           
        }
     }

};
</script>

<style lang="scss" scoped></style>
