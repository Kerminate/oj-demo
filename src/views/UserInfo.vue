<template lang="html">
  <div class="user-wrap">
    <ul>
      <li>{{ user.uid }}</li>
      <li><i class="el-icon-info"></i> Nick:&nbsp;&nbsp;{{ user.nick }}</li>
      <li><i class="el-icon-edit"></i> Motto:&nbsp;&nbsp;{{ user.motto }}</li>
      <li><i class="el-icon-message"></i> Mail:&nbsp;&nbsp;{{ user.mail }}</li>
      <li><i class="el-icon-location-outline"></i> School:&nbsp;&nbsp;{{ user.school }}</li>
      <li><i class="el-icon-success"></i> Solved:&nbsp;&nbsp;{{ user.solve }}</li>
      <li><i class="el-icon-error"></i> Unsolved:&nbsp;&nbsp;{{ user.submit - user.solve }}</li>
    </ul>
    <div class="solved">
      <div class="solved-name">Solved</div>
      <el-button v-for="(item, index) in solved" :key="item" type="text">
        <router-link :to="{ name: 'problemInfo', params: { pid: item } }">{{ item }}</router-link>
      </el-button>
    </div>
    <div class="unsolved">
      <div class="unsolved-name">Solved</div>
      <el-button v-for="item in unsolved" :key="item" type="text">
        <router-link :to="{ name: 'problemInfo', params: { pid: item } }">{{ item }}</router-link>
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'user',
      'solved',
      'unsolved'
    ])
  },
  created () {
    this.$store.dispatch('updateUser', this.$route.params)
    console.log(this.solved)
  }
}
</script>

<style lang="stylus">
  .user-wrap
    text-align: left
    line-height: 30px
    .solved, .unsolved
      margin-bottom: 30px
    button
      margin-left: 10px
      padding: 0
    a
      color: #B12CCC
</style>
