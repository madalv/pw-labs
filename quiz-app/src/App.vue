<template>
  <NavBar></NavBar>
  <RouterView></RouterView>
</template>



<script>

import NavBar from './components/NavBar.vue';
import {userStore} from './stores/userStore'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {userStore}
  },
}
</script>
