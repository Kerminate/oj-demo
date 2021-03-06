import Vue from 'vue'
import Router from 'vue-router'

// general
import NewsInfo from '@/views/NewsInfo.vue'
import Home from '@/views/Home.vue'
import Status from '@/views/Status.vue'
import UserInfo from '@/views/UserInfo.vue'
import Statistics from '@/views/problem/Statistics.vue'
import Ranklist from '@/views/Ranklist.vue'

// problems
import ProblemList from '@/views/ProblemList.vue'
import ProblemInfo from '@/views/problem/ProblemInfo.vue'
import Problem from '@/views/problem/Problem.vue'
import ProblemEdit from '@/views/problem/ProblemEdit.vue'
import Submit from '@/views/problem/Submit.vue'

// admin
import ProblemAdd from '@/views/admin/ProblemAdd.vue'
import ContestAdd from '@/views/admin/ContestAdd.vue'

// contests
import ContestList from '@/views/ContestList.vue'
import ContestInfo from '@/views/contest/ContestInfo.vue'
import ContestOverview from '@/views/contest/ContestOverview.vue'
import ContestProblem from '@/views/contest/ContestProblem.vue'
import ContestStatus from '@/views/contest/ContestStatus.vue'
import ContestRanklist from '@/views/contest/ContestRanklist.vue'
import ContestEdit from '@/views/contest/ContestEdit.vue'

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
    component: ProblemList,
    props: true
  },
  {
    path: '/problem/:pid',
    component: Problem,
    children: [
      {
        path: '', // 默认子组件
        name: 'problemInfo',
        component: ProblemInfo
      },
      {
        path: 'statistics',
        name: 'statistics',
        component: Statistics
      },
      {
        path: 'submit',
        name: 'submit',
        component: Submit
      },
      {
        path: 'edit',
        name: 'problemEdit',
        component: ProblemEdit
      }
    ]
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
    path: '/ranklist',
    name: 'ranklist',
    component: Ranklist,
    props: true
  },
  {
    path: 'admin/problem/add',
    name: 'problemAdd',
    component: ProblemAdd
  },
  {
    path: 'admin/contest/add',
    name: 'contestAdd',
    component: ContestAdd
  },
  {
    path: '/contest',
    name: 'contestList',
    component: ContestList
  },
  {
    path: '/contest/:cid',
    component: ContestInfo,
    children: [
      {
        path: '',
        name: 'contest.overview',
        component: ContestOverview
      },
      {
        path: 'problem/:id',
        name: 'contest.problem',
        component: ContestProblem
      },
      {
        path: 'status',
        name: 'contest.status',
        component: ContestStatus
      },
      {
        path: 'ranklist',
        name: 'contest.ranklist',
        component: ContestRanklist
      },
      {
        path: 'edit',
        name: 'contest.edit',
        component: ContestEdit
      }
    ]
  }
]

const router = new Router({
  // mode: 'history',
  routes
})

export default router
