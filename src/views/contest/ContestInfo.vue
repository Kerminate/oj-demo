<template lang="html">
  <div class="conin-wrap">
    <el-tabs :value="display" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="Overview" name="contest.overview"></el-tab-pane>
      <el-tab-pane label="Problem" name="contest.problem"></el-tab-pane>
      <el-tab-pane label="Status" name="contests.status"></el-tab-pane>
      <el-tab-pane label="Ranklist" name="problemEdit"></el-tab-pane>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
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
    ])
  },
  created () {
    this.display = this.$route.name
    this.$store.dispatch('getContest', this.$route.params)
  },
  methods: {
    handleClick (tab) {
      if (tab.name === 'contest.overview') {
        this.$router.push({ name: tab.name, params: { cid: this.$route.params.cid } })
      } else if (tab.name === 'contest.problem') {
        this.$router.push({ name: tab.name, params: { cid: this.$route.params.cid, id: this.$route.params.id || 1 } })
      } else if (tab.name === 'contest.status') {
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
</style>
