import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Design from '@/views/design/Design.vue'
import Preview from '@/views/design/Preview.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/design',
    component: Design
  },
  {
    path: '/preview',
    component: Preview
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
