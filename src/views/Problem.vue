<template lang="html">
  <div>
    <navigate></navigate>
    <el-row class="main" align="middle">
      <el-col :offset="2" :span="6">
        <el-pagination
          background
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="sumProblem">
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
      <el-col :span="3">
        <el-input v-model="content" placeholder="请输入内容" size="small"></el-input>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" size="small" @click="search" @keyup.enter="search">Search</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" class="eltable">
      <el-table-column label="#" align="center" width="50">
        <template slot-scope="scope">
          <i class="el-icon-check" v-if="scope.row.isdone"></i>
        </template>
      </el-table-column>
      <el-table-column label="PID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" align="center">
        <template slot-scope="scope">
          <el-button type="text">{{ scope.row.title }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="Submit" align="center">
        <template slot-scope="scope">
          <i class="el-icon-edit size"></i>
        </template>
      </el-table-column>
      <el-table-column label="Ratio" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.accepted / scope.row.submit | formate }}</span>
          (<el-button type="text">{{ scope.row.accepted }}</el-button> / <el-button style="margin-left:0px" type="text">{{ scope.row.submit }}</el-button>)
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
import Navigate from '@/components/Navigate.vue'
import api from '@/axios.js'

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
      tableData: [],
      currentPage: 1,
      sumProblem: 1
    }
  },
  created () {
    this.getProblems()
    this.count()
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    getProblems () {
      let opt = {
        page: this.currentPage
      }
      if (this.content !== '') {
        opt.type = this.type
        if (this.type === 'pid') {
          opt.content = parseInt(this.content)
        } else {
          opt.content = this.content
        }
      }
      api.getProblems(opt).then(({ data }) => {
        if (data.success) {
          this.tableData = data.result
        } else {
          this.$message({
            type: 'info',
            message: '获取数据失败'
          })
        }
      })
    },
    count () {
      let opt = {}
      if (this.content !== '') {
        opt.type = this.type
        if (this.type === 'pid') {
          opt.content = parseInt(this.content)
        } else {
          opt.content = this.content
        }
      }
      api.countProblem(opt).then(({ data }) => {
        if (data.success) {
          this.sumProblem = data.result
          console.log(data.result)
        } else {
          this.$message({
            type: 'info',
            message: '获取题目数量失败'
          })
        }
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getProblems()
    },
    select () {
      this.content = ''
      console.log(this.content)
    },
    search () {
      this.getProblems()
      this.count()
    }
  },
  components: {
    Navigate
  }
}
</script>

<style lang="stylus">
  .main
    margin-bottom: 20px
  .eltable
    margin-left: 8%
    width: 84%
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
