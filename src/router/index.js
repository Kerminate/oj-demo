import Vue from 'vue'
import Router from 'vue-router'
import ProblemList from '@/views/ProblemList.vue'
import ProblemInfo from '@/views/ProblemInfo.vue'
import NewsInfo from '@/views/NewsInfo.vue'
import Home from '@/views/Home.vue'
import Status from '@/views/Status.vue'
import UserInfo from '@/views/UserInfo.vue'
import Statistics from '@/views/Statistics.vue'
import Ranklist from '@/views/Ranklist.vue'

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
  },
  {
    path: '/news/:nid',
    name: 'newsInfo',
    component: NewsInfo
  },
  {
    path: '/status',
    name: 'status',
    component: Status
  },
  {
    path: '/user/:uid',
    name: 'userInfo',
    component: UserInfo
  },
  {
    path: '/statistics/:pid',
    name: 'statistics',
    component: Statistics
  },
  {
    path: '/ranklist',
    name: 'ranklist',
    component: Ranklist
  }
]

const router = new Router({
  // mode: 'history',
  routes
})

export default router
