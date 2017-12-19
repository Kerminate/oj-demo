<template lang="html">
  <div class="prolist-wrap">
    <el-row class="pro-main" align="middle">
      <el-col :span="8">
        <el-pagination
          background
          @current-change="(val) => getProblems({ page: val })"
          layout="total, prev, pager, next, jumper"
          :pageSize="pageSize || 30"
          :total="sumProblem"
          >
        </el-pagination>
      </el-col>
      <el-col :offset="8" :span="2">
        <el-select v-model="type" placeholder="请选择" size="small" @change="select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input v-model="content" placeholder="请输入内容" size="small"></el-input>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" size="small" @click="search" @keyup.enter="search">Search</el-button>
      </el-col>
    </el-row>
    <el-table :data="problemList" class="eltable">
      <el-table-column label="#" align="left" min-width="30">
        <template slot-scope="scope">
          <i class="el-icon-check" v-show="scope.row.isdone"></i>
        </template>
      </el-table-column>
      <el-table-column label="PID" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.pid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" align="left">
        <template slot-scope="scope">
          <router-link :to="{ name: 'problemInfo', params: { pid: scope.row.pid } }">
            <el-button type="text">{{ scope.row.title }}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Ratio" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.solve / (scope.row.submit + 0.0000001) | formate }}</span>
          (<router-link :to="{ name: 'status', query: { pid: scope.row.pid, judge: 3 } }">
            <el-button type="text">{{ scope.row.solve }}</el-button>
          </router-link> /
           <router-link :to="{ name: 'status', query: { pid: scope.row.pid } }">
             <el-button style="margin-left:0px" type="text">{{ scope.row.submit }}</el-button>
           </router-link>)
        </template>
      </el-table-column>
      <el-table-column label="Tags" align="left">
        <template slot-scope="scope">
          <el-tag size="small" v-for="(item, index) in scope.row.tags" :key="index">{{ item }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import only from 'only'

export default {
  data () {
    return {
      options: [
        {
          value: 'pid',
          label: 'Pid'
        },
        {
          value: 'title',
          label: 'Title'
        },
        {
          value: 'tag',
          label: 'Tag'
        }
      ]
    }
  },
  props: {
    type: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: null
    }
  },
  created () {
    this.getProblems()
  },
  computed: {
    ...mapGetters([
      'problemList',
      'sumProblem'
    ])
  },
  methods: {
    getProblems (others) {
      const opt = Object.assign(
        only(this, 'type content page pageSize'),
        others
      )
      this.$router.push({
        name: 'problemList',
        query: opt
      })
      this.$store.dispatch('getProblemList', opt)
    },
    select () {
      this.content = ''
    },
    search () {
      this.getProblems({ page: 1 })
    }
  }
}
</script>

<style lang="stylus">
  .prolist-wrap
    .pro-main
      margin-bottom: 20px
    .eltable
      margin-bottom: 20px
    .el-table th
      padding: 8px 0
    .el-table td
      padding: 2px 0
    .size
      font-size: 24px
      color: #B12CCC
      cursor: pointer
</style>
