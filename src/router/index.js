import Vue from 'vue'
import Router from 'vue-router'
import ProblemList from '@/views/ProblemList.vue'
import ProblemInfo from '@/views/ProblemInfo.vue'
import Home from '@/views/Home.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/problem',
    name: 'problemList',
    component: ProblemList
  },
  {
    path: '/problem/:pid',
    name: 'problemInfo',
    component: ProblemInfo
  }
]

const router = new Router({
  // mode: 'history',
  routes
})

export default router
