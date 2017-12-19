<template lang="html">
  <div class="pro-wrap">
    <el-tabs v-model="display" type="border-card" @tab-click="handleClick">
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
      display: 'problemInfo'
    }
  },
  methods: {
    handleClick () {
      this.$router.push({ name: this.display, params: { pid: this.$route.params.pid } })
    }
  }
}
</script>

<style lang="stylus">
  .pro-wrap
    margin-right: 20px
</style>
