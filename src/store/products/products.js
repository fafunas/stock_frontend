import axios from 'axios'
import authHeader from '@/services/login/auth_header'

export default{
    namespaced: true,
    state:{
        products:[],
        types:[],
        groups:[],
        sameStock:0,
        lessStock:0,
        moreStock:0
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
               // console.table(data.data.group[0])
                //console.log(data.data.group[0])
            })
            
        }

    },
    getters:{
        types: state => state.types,
        group: state => state.groups,
        products: state=>state.products
    }
}