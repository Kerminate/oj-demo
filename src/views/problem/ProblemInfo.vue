<template lang="html">
  <div class="proinfo-wrap">
    <h1>{{ problem.pid }}:  {{ problem.title }}</h1>
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
  computed: {
    ...mapGetters('problem', [
      'problem'
    ])
  },
  created () {
    this.$store.dispatch('problem/getProblem', this.$route.params)
  }
}
</script>

<style lang="stylus">
  .proinfo-wrap
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
