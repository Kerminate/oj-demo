<template lang="html">
  <div class="statis-wrap">
    <div class="left">
      <table>
        <tr>
          <th>Result</th>
          <th>Amount</th>
        </tr>
        <tr>
          <td>Total Submissions</td>
          <td>{{ sumStatis }}</td>
        </tr>
      <div id="myChart" class="charts">

      </div>
        <tr v-for="(item, index) in countList">
          <td>{{ name[index] }}</td>
          <td>{{ item }}</td>
        </tr>
      </table>
    </div>
    <!-- <el-table :data="statisTable" class="eltable">
      <el-table-column label="Result" align="center" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Amount" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { statisTableObj } from '../util/constant.js'
import echarts from 'echarts'
// let echarts = require('echarts/lib/echarts')

export default {
  data () {
    return {
      name: statisTableObj
    }
  },
  computed: {
    ...mapGetters([
      'statisticsList',
      'countList',
      'sumStatis',
      'statisTable'
    ])
  },
  created () {
    this.$store.dispatch('updateStatistics', this.$route.params)
  },
  mounted () {
    let drawLine = this.drawLine()
    window.onresize = function temp () {
      drawLine.resize() // 重绘，窗口大小改动时
    }
  },
  methods: {
    // setEcharts () {
    //   let dom = this.$refs.mychart
    //   this.myChart = echarts.init(dom)
    //   this.myChart.setOption(this.opt)
    // },
    drawLine () {
      let myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'left',
                  max: 1548
                }
              }
            },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      })
      return myChart
    }
    // drawLine () {
    //   // 基于准备好的dom，初始化echarts实例
    //   let myChart = echarts.init(document.getElementById('myChart'))
    //   // 绘制图表
    //   myChart.setOption({
    //     title: { text: 'ECharts 入门示例' },
    //     tooltip: {},
    //     xAxis: {
    //       data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    //     },
    //     yAxis: {},
    //     series: [{
    //       name: '销量',
    //       type: 'bar',
    //       data: [5, 20, 36, 10, 10, 20]
    //     }]
    //   })
    //   return myChart
    // }
  }
}
</script>

<style lang="stylus">
  .statis-wrap
    a
      color: #5a5e66
    .charts
      height: 500px
      width: 500px
</style>
