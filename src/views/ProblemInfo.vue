<template lang="html">
  <div class="proinfo-wrap">
    <h1>{{ problem.title }}</h1>
    <h5>Time Limit: {{ problem.time }}MS&nbsp;&nbsp;&nbsp;Memory Limit: {{ problem.memory }}KB</h5>
    <h3>Description</h3>
    <p>{{ problem.description }}</p>
    <h3>Input</h3>
    <p>{{ problem.input }}</p>
    <h3>Output</h3>
    <p>{{ problem.output }}</p>
    <h3>Sample Input</h3>
    <p>{{ problem.in }}</p>
    <h3>Sample Output</h3>
    <p>{{ problem.out }}</p>
    <h3>Hint</h3>
    <p>{{ problem.hint }}</p>
    <el-row class="button">
      <el-button>Submit</el-button>
      <el-button>Statistic</el-button>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'problem'
    ])
  },
  created () {
    this.$store.dispatch('updateProblem', this.$route.params)
  }
}
</script>

<style lang="stylus">
  .proinfo-wrap
    h3
      text-align: left
      border-bottom: 1px solid #e8e8e8
      padding: 10px 0
    p
      text-align: left
      margin-left: 20px
    .button
      margin: 30px 0
</style>
