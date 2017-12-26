<template lang="html">
  <div class="statis-wrap">
    <div class="left">
      <table>
        <tr>
          <th class="t1">Result</th>
          <th class="t2">Amount</th>
        </tr>
        <tr>
          <td class="t1">Total Submissions</td>
          <td class="t2">
            <router-link :to="{ name: 'status', query: { pid } }">
              <el-button type="text">{{ sumCharts }}</el-button>
            </router-link>
          </td>
        </tr>
      </table>
      <div id="myChart" class="charts"></div>
      <table>
        <tr v-for="(item, index) in countList">
          <td class="t1">{{ name[index] }}</td>
          <td class="t2">
            <router-link :to="{ name: 'status', query: { pid, judge: index + 2 } }">
              <el-button type="text">{{ item }}</el-button>
            </router-link>
          </td>
        </tr>
      </table>
    </div>
    <div class="right">
      <el-table :data="statisticsList" class="eltable">
        <el-table-column label="Rank" type="index" :index="indexMethod" align="left" width="70">
        </el-table-column>
        <el-table-column label="Username" align="left" min-width="100">
          <template slot-scope="scope">
            <router-link :to="{ name: 'userInfo', params: { uid: scope.row.uid } }">
              <el-button type="text">{{ scope.row.uid }}</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="Time" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.time }} MS</span>
          </template>
        </el-table-column>
        <el-table-column label="Memory" align="left" width="">
          <template slot-scope="scope">
            <span>{{ scope.row.memory }} KB</span>
          </template>
        </el-table-column>
        <el-table-column label="Length" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.length }} B</span>
          </template>
        </el-table-column>
        <el-table-column label="Lang" align="left" width="">
          <template slot-scope="scope">
            <span>{{ lang[scope.row.language] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Submit Time" align="left" min-width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.time | timePretty }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout=" sizes, prev, pager, next, jumper"
        :total="sumStatis"
        :page-sizes="[20, 30, 40]"
        :page-size="pageSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import constant from '@/util/constant.js'
import echarts from 'echarts'
// let echarts = require('echarts/lib/echarts')

export default {
  data () {
    return {
      name: constant.statisTableObj,
      lang: constant.language,
      currentPage: 1,
      pageSize: 20,
      pid: ''
    }
  },
  computed: {
    ...mapGetters('statistics', [
      'statisticsList',
      'countList',
      'sumCharts',
      'sumStatis',
      'statisTable'
    ])
  },
  created () {
    this.getStatistics()
    this.pid = this.$route.params.pid
  },
  mounted () {
    let drawLine = this.drawLine()
    window.onresize = () => drawLine.resize() // 重绘，窗口大小改动时
  },
  methods: {
    getStatistics () {
      let opt = {
        page: this.currentPage,
        pageSize: this.pageSize,
        pid: this.$route.params.pid
      }
      this.$store.dispatch('statistics/updateStatistics', opt)
    },
    drawLine () {
      let myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: {
          text: 'Statistics for ' + this.$route.params.pid,
          x: 'center',
          y: 'top'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} </br>{d}%'
        },
        legend: {
          orient: 'horizontal',
          x: 'center',
          y: 'bottom',
          data: ['CE', 'AC', 'RE', 'WA', 'TLE', 'MLE', 'OLE', 'PE', 'SE']
        },
        calculable: true,
        series: [
          {
            name: 'Statistics',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: this.countList[0], name: 'CE'},
              {value: this.countList[1], name: 'AC'},
              {value: this.countList[2], name: 'RE'},
              {value: this.countList[3], name: 'WA'},
              {value: this.countList[4], name: 'TLE'},
              {value: this.countList[5], name: 'MLE'},
              {value: this.countList[6], name: 'OLE'},
              {value: this.countList[7], name: 'PE'},
              {value: this.countList[8], name: 'SE'}
            ]
          }
        ]
      })
      return myChart
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getStatistics()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getStatistics()
    },
    indexMethod (index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize
    }
  }
}
</script>

<style lang="stylus">
  .statis-wrap
    display: flex
    justify-content: space-around
    a
      color: #5a5e66
    .left
      margin-bottom: 20px
      width: 32%
      table
        width: 100%
        border-collapse: collapse
        tr:hover
          background: #f5f7fa
        th, td
          height: 37px
          border-bottom: 1px solid #e6ebf5
        .t1
          width: 60%
        .t2
          width: 40%
      .charts
        height: 420px
        width: 95%
        margin-top: 10px
        margin-bottom: 20px
    .right
      width: 65%
      margin-bottom: 20px
      .el-table
        margin-bottom: 20px
      .el-table th
        padding: 8px 0
      .el-table td
        padding: 0
</style>
