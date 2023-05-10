import { createRouter, createWebHistory } from 'vue-router'
import QuizList from '../views/QuizList.vue'
import QuizDetails from '../views/QuizDetails.vue'

const routes = [
  {
    path: '/',
    name: 'quizList',
    component: QuizList,
  },
  {
    path: '/signin',
    name: 'signIn',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/SignInView.vue'
      ),
  },
  {
    path: '/quiz/:id',
    name: 'quizDetails',
    component: QuizDetails,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
