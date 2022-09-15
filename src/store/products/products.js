import axios from 'axios'
import authHeader from '@/services/login/auth_header'

export default{
    namespaced: true,
    state:{
        products:[],
        types:[],
        groups:[],
        lessStock:0,
        equalTo:0,
        lessStockProducts:[],
        equalToProducts:[]        
    },

    mutations:{
        PRODUCTS(state,payload){
            state.products= payload
        },
        TYPES(state,payload){
            state.types= payload
        },
        GROUPS(state,payload){
            state.groups = payload
        },
        LESSTHAN(state,payload){
            state.lessStock= payload.lessTotal[0]
            state.equalTo = payload.totalSame[0]
            state.lessStockProducts = payload.lessthan
            state.equalToProducts = payload.same
        }

    },
    actions:{
        getAllProducts(context){
            axios.get(process.env.VUE_APP_SERVER_URL + 'products',{headers: authHeader()})
            .then((data)=>{
                context.commit("PRODUCTS", data.data)
            })
        },

        getAllTypes(context){
            axios.get(process.env.VUE_APP_SERVER_URL + 'types',{headers: authHeader()})
            .then((data)=>{
                context.commit("TYPES",data.data.types[0])
            })
        },

        getAllGroups(context){
            axios.get(process.env.VUE_APP_SERVER_URL + 'groups',{headers: authHeader()})
            .then((data)=>{
                context.commit("GROUPS",data.data.group[0])
            })
            
        },
        getlessProduct(context){
            axios.get(process.env.VUE_APP_SERVER_URL + 'products/lessthan',{headers: authHeader()})
            .then((data)=>{
                context.commit("LESSTHAN",data.data)
           //     console.log("esto viene del store",data.data)
            
            })
            
        }

    },
    getters:{
        types: state => state.types,
        group: state => state.groups,
        products: state=>state.products
    }
}