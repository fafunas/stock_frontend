import axios from 'axios'

export default{
    namespaced: true,
    state:{
        products:[],
        types:[],
        groups:[],
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
            axios.get(process.env.VUE_APP_SERVER_URL + 'products')
            .then((data)=>{
                context.commit("PRODUCTS", data.data)
            })
        },

        getAllTypes(context){
            axios.get(process.env.VUE_APP_SERVER_URL + 'types')
            .then((data)=>{
                context.commit("TYPES",data.data.types[0])
            })
        },

        getAllGroups(context){
            axios.get(process.env.VUE_APP_SERVER_URL + 'groups')
            .then((data)=>{
                context.commit("GROUPS",data.data.group[0])
                console.table(data.data.group[0])
                console.log(data.data.group[0])
            })
            
        }

    },
    getters:{
        types: state => state.types,
        group: state => state.groups
    }
}