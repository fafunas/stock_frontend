import axios from 'axios'
import authHeader from '@/services/login/auth_header'

export default{
    namespaced: true,
    state:{
        users:[],
        userEnables:[],
        rol:[],
        userRol:"",
        id:""

    },

    mutations:{
        USERS(state,payload){
            state.users= payload
        },
        USERSENABLES(state,payload){
            state.userEnables= payload
        },
        ROLES(state,payload){
            state.rol = payload
        },
        USERROL(state,payload){
            state.userRol = payload.role
            state.id = payload.i
        },
        
        

    },
    actions:{
        getAllUsers(context){
            axios.get(process.env.VUE_APP_SERVER_URL + 'users/all' ,{headers: authHeader()})
            .then((data)=>{
                context.commit("USERS", data.data)
            })
        },

        getEnableUsers(context){
            axios.get(process.env.VUE_APP_SERVER_URL + 'users' ,{headers: authHeader()})
            .then((data)=>{
                context.commit("USERSENABLES", data.data.usuarios)
                //console.log(data.data.usuarios)
            })
        },

        getAllRoles(context){
            axios.get(process.env.VUE_APP_SERVER_URL + 'rol' ,{headers: authHeader()})
            .then((data)=>{
                context.commit("ROLES", data.data.roles)
              //  console.log(data.data.roles)
            })
        },
        getRolbyMail(context,payload){
            
            axios.post(process.env.VUE_APP_SERVER_URL + 'rol/rol' ,payload)
            .then((data)=>{
                context.commit("USERROL",data.data)
                
                //console.log(data.data)
            })

        }



    },
    getters:{
        usersEnables : state=> state.userEnables,
        roles: state => state.rol,
        userRol : state=> state.userRol
    },

}