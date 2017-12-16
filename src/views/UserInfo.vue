<template lang="html">
  <div class="user-wrap">
    <el-row>
      <el-col :span="8">
        <img src="../assets/logo.png" alt="">
        <h1>{{ user.nick }}</h1>
        <h3>{{ user.solve }} / {{ user.solve + user.submit }}</h3>
        <i class="el-icon-info"></i> {{ `Nick: ${user.nick}` }}
        <div class="motto">
          <i class="el-icon-edit"></i> {{ `Motto: ${user.motto}` }}
        </div>
        <div v-if="user.mail">
          <i class="el-icon-message"></i>{{ `Mail: ${user.mail}` }}
        </div>
        <div v-if="user.school">
          <i class="el-icon-location-outline"></i>{{ `School: ${user.school}` }}
        </div>
      </el-col>
      <el-col :span="16">
        <div class="solved">
          <div class="solved-name">Solved</div>
          <el-button v-for="(item, index) in solved" :key="item" type="text">
            <router-link :to="{ name: 'problemInfo', params: { pid: item } }">{{ item }}</router-link>
          </el-button>
        </div>
        <div class="unsolved">
          <div class="unsolved-name">Unolved</div>
          <el-button v-for="item in unsolved" :key="item" type="text">
            <router-link :to="{ name: 'problemInfo', params: { pid: item } }">{{ item }}</router-link>
          </el-button>
        </div>
      </el-col>
    </el-row>
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
    .image
      width: 100%
      display: block
    .motto // motto 可能非常长，以至于一页放不下
      word-break: break-all
</style>
