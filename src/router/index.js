import Vue from 'vue'
import Router from 'vue-router'
import Problem from '@/views/Problem.vue'
import ProblemInfo from '@/views/ProblemInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Problem'
      }
    },
    {
      path: '/problem',
      name: 'Problem',
      component: Problem,
      props: (route) => route.query
    },
    {
      path: '/problem/:pid',
      name: 'ProblemInfo',
      component: ProblemInfo,
      props: true
    }
  ]
})
