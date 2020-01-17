import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    component: () => import('../views/List.vue')
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('../views/Info.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
