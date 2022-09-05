<template>
  <v-alert class="float-right" v-model="visible" shaped :type="type">{{text}}</v-alert>
</template>



<script>

import {mapState} from 'vuex'

export default {
   
computed:{
    ...mapState('notifications',['text','type','visible'])
}

};
</script>

<style scoped>

.alert{
  position: fixed!important;
    z-index: 99999;
    top: 90vh;
    right: 5%;
  }

</style>