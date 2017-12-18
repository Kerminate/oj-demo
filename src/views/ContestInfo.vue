<template lang="html">
  <div class="conin-wrap">
    <el-tabs v-model="display" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="Overview" name="contestOverview"></el-tab-pane>
      <el-tab-pane label="Problem" name="submit"></el-tab-pane>
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
      display: 'contestOverview'
    }
  },
  created () {
    this.$router.push({ name: 'contestOverview', params: { cid: this.$route.params.cid } })
  },
  methods: {
    handleClick () {
      this.$router.push({ name: this.display, params: { cid: this.$route.params.cid } })
    }
  }
}
</script>

<style lang="css">
</style>
