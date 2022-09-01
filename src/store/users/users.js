import axios from 'axios'

export default{
    namespaced: true,
    state:{
        users:[],
        userEnables:[]
    },

    mutations:{
        USERS(state,payload){
            state.users= payload
        },
        USERSENABLES(state,payload){
            state.userEnables= payload
        },
        

    },
    actions:{
        getAllUsers(context){
            axios.get(process.env.VUE_APP_SERVER_URL + 'users/all')
            .then((data)=>{
                context.commit("USERS", data.data)
            })
        },

        getEnableUsers(context){
            axios.get(process.env.VUE_APP_SERVER_URL + 'users')
            .then((data)=>{
                context.commit("USERSENABLES", data.data.usuarios)
                //console.log(data.data.usuarios)
            })
        },



    },
    getters:{
        usersEnables : state=> state.userEnables
    }
}