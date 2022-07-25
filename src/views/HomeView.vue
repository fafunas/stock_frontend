<template>
  <div>
    <v-row>
      <v-col cols="2"> <SideBar class="sidebar" /></v-col>
      <v-col cols="10"><User/></v-col>
    </v-row>
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import User from "../components/user/UserAbm.vue"

export default {
  name: "HomeView",

  components: { SideBar, User },
};
</script>

<style scoped>
.sidebar {
  padding: 0;
}
</style>
