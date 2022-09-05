import axios from 'axios'
import authHeader from '@/services/login/auth_header'

export default{
    namespaced: true,
    state:{
        supplier:[],
        
    },

    mutations:{
        SUPPLIERS(state,payload){
            state.supplier= payload
        },
        
    },
    actions:{
        getAllSuppliers(context){
            axios.get(process.env.VUE_APP_SERVER_URL + 'supplier',{headers: authHeader()})
            .then((data)=>{
                context.commit("SUPPLIERS", data.data.suppliers)
             //   console.log(data.data)
            })
        },

    },
    getters:{
        supplier: state => state.supplier,
        
    }
}