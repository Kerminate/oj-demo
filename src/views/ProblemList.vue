<template lang="html">
  <div class="pro-wrap">
    <el-row class="pro-main" align="middle">
      <el-col :span="8">
        <el-pagination
          background
          :current-page.sync="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout=" sizes, prev, pager, next, jumper"
          :total="sumProblem"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize">
        </el-pagination>
      </el-col>
      <el-col :offset="8" :span="2">
        <el-select v-model="type" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="select">
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
      <el-table-column label="#" align="center" width="50">
        <template slot-scope="scope">
          <i class="el-icon-check" v-show="scope.row.isdone"></i>
        </template>
      </el-table-column>
      <el-table-column label="PID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" align="center">
        <template slot-scope="scope">
          <router-link :to="{ name: 'problemInfo', params: { pid: scope.row.pid } }">
            <el-button type="text">{{ scope.row.title }}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Submit" align="center">
        <template slot-scope="scope">
          <i class="el-icon-edit size"></i>
        </template>
      </el-table-column>
      <el-table-column label="Ratio" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.solve / scope.row.submit | formate }}</span>
          (<el-button type="text">{{ scope.row.solve }}</el-button> / <el-button style="margin-left:0px" type="text">{{ scope.row.submit }}</el-button>)
        </template>
      </el-table-column>
      <el-table-column label="Tags" align="center">
        <template slot-scope="scope">
          <el-tag size="small" v-for="(item, index) in scope.row.tags" :key="index">{{ item }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import api from '@/axios.js'

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
      ],
      type: 'pid',
      content: '',
      currentPage: 1,
      pageSize: 10
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
    getProblems () {
      let opt = {
        page: this.currentPage,
        pageSize: this.pageSize
      }
      if (this.content !== '') {
        opt.type = this.type
        if (this.type === 'pid') {
          opt.content = parseInt(this.content)
        } else {
          opt.content = this.content
        }
      }
      this.$store.dispatch('updateProblemList', opt)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getProblems()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getProblems()
    },
    select () {
      this.content = ''
      console.log(this.content)
    },
    search () {
      this.getProblems()
    }
  }
}
</script>

<style lang="stylus">
  .pro-wrap
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