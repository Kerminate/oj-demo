<template lang="html">
  <div class="conin-wrap">
    <el-card class="box-card">
      <el-row>
        <el-col :span="6">Begin: {{ contest.start | timePretty }}</el-col>
        <el-col :span="12" v-if="Date.now() < contest.start">Ready</el-col>
        <el-col :span="12" v-if="Date.now() > contest.start && Date.now() < contest.end">Running</el-col>
        <el-col :span="12" v-if="Date.now() > contest.end">Ended</el-col>
        <el-col :span="6">End: {{ contest.end | timePretty }}</el-col>
      </el-row>
      <el-progress :text-inside="true" :stroke-width="18" :percentage="timePercentage"></el-progress>
    </el-card>
    <el-tabs :value="display" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="Overview" name="contest.overview"></el-tab-pane>
      <el-tab-pane label="Problem" name="contest.problem"></el-tab-pane>
      <el-tab-pane label="Status" name="contest.status"></el-tab-pane>
      <el-tab-pane label="Ranklist" name="contest.ranklist"></el-tab-pane>
      <router-view></router-view>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      display: ''
    }
  },
  computed: {
    ...mapGetters([
      'contest'
    ]),
    timePercentage () {
      if (Date.now() < this.contest.start) {
        return 0
      } else if (Date.now() > this.contest.end) {
        return 100
      } else {
        return +((Date.now() - this.contest.start) * 100 /
        (this.contest.end - this.contest.start)).toFixed(1)
      }
    }
  },
  created () {
    this.display = this.$route.name
    this.$store.dispatch('getContest', this.$route.params)
  },
  methods: {
    handleClick (tab) {
      if (tab.name === 'contest.problem') {
        this.$router.push({ name: tab.name, params: { cid: this.$route.params.cid, id: this.$route.params.id || 1 } })
      } else {
        this.$router.push({ name: tab.name, params: { cid: this.$route.params.cid } })
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.display = to.name
    }
  }
}
</script>

<style lang="stylus">
  .conin-wrap
    margin-bottom: 20px
    .el-card
      margin-bottom: 20px
      .el-row
        margin-bottom: 20px
</style>
