<template>
    <v-row>
         <v-col cols="auto">
      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="dialog"
      >
      <v-card>
        <v-card-title>Aca tiene que ir el titulo</v-card-title>
        <v-divider></v-divider>
        <v-card-text>Aca iria el cuadro</v-card-text>
        <v-card-actions class="justify-end">
              <v-btn
                text
                @click="closeDialog()"
              >Close</v-btn>
            </v-card-actions>
      </v-card>
       
      </v-dialog>
    </v-col>
    </v-row>
</template>

<script>
import {mapState} from 'vuex'
    export default {
       data:()=>({
       
       }),

       computed:{
        ...mapState({
            dialog: state=> state.dialog.dialog
        })
       },

       methods:{
        closeDialog(){
            this.$store.dispatch('dialog/END_DIALOG')
        }
       }
    }
</script>
    
<style lang="scss" scoped>

</style>