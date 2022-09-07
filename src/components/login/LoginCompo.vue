<template>
  <v-container fill-height fluid class="grey lighten-5">
    <v-row row class="text-xs-center" align="center" justify="center">
      <v-col cols="12" sm="4">
        <v-card flat>
          <v-card-title primary-title>
            <h4>Login</h4>
          </v-card-title>
          <v-form>
            <v-text-field
              prepend-icon="mdi-account"
              v-model="user.email"
              label="Mail"
              ref="email"
            >
            </v-text-field>
            <v-text-field
            prepend-icon="mdi-lock"
            v-model="user.password"
            label="Password"
            type="password"
            ></v-text-field>
            <v-card-actions>
                <v-btn primary large block @click="login">Login</v-btn>
            </v-card-actions>
          </v-form>
         <v-snackbar :timeout='timeout' rounded="pill" center v-model="snackbar">{{message}}</v-snackbar>
          
        </v-card>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
import User from '@/models/User';
export default {
    name:"LoginCompo",
    data() {
        return {
            user : new User ('',''),
            successful: false,
            message:'',
            snackbar : false,
            timeout: 3000
            
        }
    },

    computed:{
        loggedIn(){
            return this.$store.state.auth.status.loggedIn;
        }
    },
     
    //Con este life hooks si el usuario esta logeado lo envia al home 
    created(){
        if (this.loggedIn){
            this.$router.push('/')
        }
       
    },

    mounted(){
        this.$refs.email.focus()
    },
    methods:{
        login(){
           if(this.user.email && this.user.password){
               this.$store.dispatch("auth/login", this.user)
               .then(()=>{
                  this.$store.dispatch("users/getRolbyMail", {email:this.user.email})
                   this.$router.push('/');
               },
               err=>{
                   
                   this.message = (err.response.data.msg);
                   this.snackbar= true;
                   this.user.email='';
                   this.user.password='';
                  // this.dialog=true
                   
                  // const {msg} = this.message
                   console.log(this.message)
               }
               
               )
           }
       
        },

        // refreshPage(){
        //   setTimeout(()=>{
        //     this.$forceUpdate()
        //   },2000)
        // }
    }




};
</script>

<style lang="scss" scoped></style>
