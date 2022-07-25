import axios from 'axios'

export default{
    namespaced: true,
    state:{
        users:[]
    },

    mutations:{
        USERS(state,payload){
            state.users= payload
        }

    },
    actions:{
        getAllUsers(context){
            axios.get(process.env.VUE_APP_SERVER_URL + 'users/all')
            .then((data)=>{
                context.commit("USERS", data.data)
            })
        }

    },
    getters:{}
}