<template lang="html">
  <div>
    <navigate></navigate>
    <el-row class="main" align="middle">
      <el-col :offset="2" :span="6">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="100">
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
      <el-col :span="3">
        <el-input v-model="content" placeholder="请输入内容" size="small"></el-input>
      </el-col>
      <el-col :span="1.5">
        <el-button type="primary" size="small">Search</el-button>
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
          <el-tag size="small" v-for="(item, index) in scope.row.tags">{{ item }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Navigate from '@/components/Navigate.vue'
import axios from 'axios'

export default {
  data () {
    return {
      options: [
        {
          value: '选项1',
          label: 'Pid'
        },
        {
          value: '选项2',
          label: 'Title'
        },
        {
          value: '选项3',
          label: 'Tag'
        }
      ],
      type: '',
      content: '',
      tableData: []
    }
  },
  created () {
    this.getProblems()
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    getProblems () {
      axios.get('../../mock/problems.json').then((response) => {
        if (response.status === 200) {
          this.tableData = response.data.problems
        } else {
          this.$message({
            type: 'info',
            message: '获取数据失败'
          })
        }
      })
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
