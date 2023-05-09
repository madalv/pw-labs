import { createRouter, createWebHashHistory } from 'vue-router'
import QuizList from '../views/QuizList.vue'

const routes = [
  {
    path: '/',
    name: 'quizList',
    component: QuizList
  },
  {
    path: '/signin',
    name: 'signIn',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SignInView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
