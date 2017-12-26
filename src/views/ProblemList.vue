<template lang="html">
  <div class="prolist-wrap">
    <el-row class="pro-main" align="middle">
      <el-col :span="8">
        <el-pagination
          background
          :current-page.sync="page"
          @size-change="sizeChange"
          @current-change="pageChange"
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
      <el-table-column label="Delete" align="left">
        <template slot-scope="scope">
          <el-button type="text" @click="del(scope.row.pid)">delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import only from 'only'
import { purify } from '@/util/helper'
import api from '@/api'

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
      type: this.$route.query.type || 'pid',
      content: this.$route.query.content || '',
      page: parseInt(this.$route.query.page) || 1,
      pageSize: parseInt(this.$route.query.pageSize) || 30
    }
  },
  created () {
    this.fetch()
  },
  computed: {
    ...mapGetters('problem', [
      'problemList',
      'sumProblem'
    ]),
    query () {
      const opt = only(this.$route.query, 'page pageSize type content')
      return purify(opt)
    }
  },
  methods: {
    fetch () {
      this.$store.dispatch('problem/getProblemList', this.query)
      const query = this.$route.query
      this.page = parseInt(query.page) || 1
      if (query.pageSize) this.pageSize = parseInt(query.pageSize)
      if (query.type) this.type = query.type
      if (query.content) this.content = query.content
    },
    reload (payload = {}) {
      const query = Object.assign(this.query, purify(payload))
      this.$router.push({
        name: 'problemList',
        query
      })
    },
    search () {
      this.reload({
        page: 1,
        type: this.type,
        content: this.content
      })
    },
    sizeChange (val) {
      this.reload({ pageSize: val })
    },
    pageChange (val) {
      this.reload({ page: val })
    },
    del (val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.problem.delete({pid: val})
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration: 2000,
          showClose: true
        })
        this.fetch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 2000,
          showClose: true
        })
      })
    }
  },
  watch: { // 浏览器后退时回退页面
    '$route' (to, from) {
      if (to !== from) this.fetch()
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
