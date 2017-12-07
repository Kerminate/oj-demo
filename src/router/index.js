import Vue from 'vue'
import Router from 'vue-router'
import Problem from '@/views/Problem.vue'
import ProblemInfo from '@/views/ProblemInfo.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Problem'
    }
  },
  {
    path: '/problem',
    name: 'Problem',
    component: Problem
  },
  {
    path: '/problem/:pid',
    name: 'ProblemInfo',
    component: ProblemInfo
  }
]

const router = new Router({
  // mode: 'history',
  routes
})

export default router
