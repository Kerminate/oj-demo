<template lang="html">
  <div class="pro-wrap">
    <el-tabs :value="display" @tab-click="handleClick">
      <el-tab-pane label="Description" name="problemInfo"></el-tab-pane>
      <el-tab-pane label="Submit" name="submit"></el-tab-pane>
      <el-tab-pane label="Statistics" name="statistics"></el-tab-pane>
      <el-tab-pane label="Edit" name="problemEdit"></el-tab-pane>
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
      display: ''
    }
  },
  created () {
    this.display = this.$route.name
  },
  methods: {
    handleClick (tab) {
      this.$router.push({ name: tab.name, params: { pid: this.$route.params.pid } })
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
  .pro-wrap
    margin-bottom: 20px
</style>
