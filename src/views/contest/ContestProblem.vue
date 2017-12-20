<template lang="html">
  <div class="conpro-wrap">
    <el-row type="flex" justify="start">
      <el-col :span="1">
        <el-pagination
        background
        layout="pager"
        :current-page.sync="proIndex"
        @current-change="handleCurrentChange"
        :page-count="contestTotalPro">
      </el-pagination>
      </el-col>
    </el-row>
    <h1>{{ this.$route.params.id }}:  {{ problem.title }}</h1>
    <h5>Time Limit: {{ problem.time }}MS&nbsp;&nbsp;&nbsp;Memory Limit: {{ problem.memory }}KB</h5>
    <h3>Description</h3>
    <div class="cont" v-html="problem.description"></div>
    <h3>Input</h3>
    <div class="cont" v-html="problem.input"></div>
    <h3>Output</h3>
    <div class="cont" v-html="problem.output"></div>
    <h3>Sample Input</h3>
    <p class="cont">{{ problem.in }}</p>
    <h3>Sample Output</h3>
    <p class="cont">{{ problem.out }}</p>
    <h3>Hint</h3>
    <div class="cont" v-html="problem.hint"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      proIndex: parseInt(this.$route.params.id)
    }
  },
  computed: {
    ...mapGetters([
      'problem',
      'contestOverview',
      'contestTotalPro'
    ])
  },
  created () {
    this.$store.dispatch('getProblem', { pid: this.contestOverview[this.$route.params.id - 1].pid })
    // console.log(this.contestOverview)
    // console.log(this.contestTotalPro)
  },
  methods: {
    handleCurrentChange (val) {
      this.proIndex = val
      this.$router.push({
        name: 'contest.problem',
        params: { id: this.proIndex }
      })
      this.$store.dispatch('getProblem', { pid: this.contestOverview[this.proIndex - 1].pid })
    }
  }
}
</script>

<style lang="stylus">
  .conpro-wrap
    .el-pagination
      margin-top: 10px
    h3
      text-align: left
      border-bottom: 1px solid #e8e8e8
      padding: 10px 0
    .cont
      text-align: left
      margin-left: 20px
    .button
      margin: 30px 0
    a
      color: #9f28b8
</style>
