<template>
  <NavBar></NavBar>
  <RouterView
    class="bg-gradient-to-r from-orange-300 to bg-gray-700 h-screen"
  ></RouterView>
</template>

<script>
import NavBar from './components/NavBar.vue'
import { userStore } from './stores/userStore'
import { quizStore } from './stores/quizStore'

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return { userStore }
  },
  updated() {
    console.log(JSON.stringify(this.quizStore.quizzes))
  },
}
</script>
