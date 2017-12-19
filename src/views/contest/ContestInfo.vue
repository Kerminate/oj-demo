<template lang="html">
  <div class="conin-wrap">
    <el-tabs v-model="display" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="Overview" name="contestOverview"></el-tab-pane>
      <el-tab-pane label="Problem" name="contestProblem"></el-tab-pane>
      <el-tab-pane label="Status" name="statistics"></el-tab-pane>
      <el-tab-pane label="Ranklist" name="problemEdit"></el-tab-pane>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      display: this.$route.name
    }
  },
  created () {
    // console.log(this.$route.params)
  },
  methods: {
    handleClick (tab) {
      if (tab.name === 'contestProblem') {
        this.$router.push({ name: tab.name, params: { cid: this.$route.params.cid, id: this.$route.params.id || 1 } })
      }
    }
  }
}
</script>

<style lang="stylus">
  .conin-wrap
    margin-bottom: 20px
</style>
