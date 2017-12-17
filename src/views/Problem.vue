<template lang="html">
  <div class="pro-wrap">
    <el-tabs v-model="display" type="card" @tab-click="handleClick">
      <el-tab-pane label="Description" name="problemInfo"></el-tab-pane>
      <el-tab-pane label="Statistics" name="statistics"></el-tab-pane>
      <el-tab-pane label="Submit" name="submit"></el-tab-pane>
      <el-tab-pane label="Edit" name="problemEdit"></el-tab-pane>
    </el-tabs>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data () {
    return {
      display: 'problemInfo'
    }
  },
  created () {
    this.$router.push({ name: 'problemInfo', params: { pid: this.$route.params.pid } })
  },
  methods: {
    handleClick () {
      this.$router.push({ name: this.display, params: { pid: this.$route.params.pid } })
    }
  }
}
</script>

<style lang="stylus">
</style>
