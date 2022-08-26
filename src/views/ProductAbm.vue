<template>
    <div>
        <v-row>
            <v-col cols="2"> <SideBar class="sidebar" /></v-col>
            <v-col cols="10">
                <Product/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import SideBar from "../components/SideBar.vue"
import Product from "../components/products/ProductAbm.vue"
    export default {
        name:"ProductABM",

        components:{SideBar,Product}
    }
</script>

<style lang="scss" scoped>
.sidebar {
  padding: 0;
}
</style>