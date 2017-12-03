import Vue from 'vue'
import Router from 'vue-router'
import Problem from '@/views/Problem.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Problem',
      component: Problem
    }
  ]
})
