<template lang="html">
  <div>
    <el-row class="container">
      <el-col :offset="2" :span="14">
        <el-menu :default-active="left" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">
            <router-link :to="{ name: 'home', params: {} }">Home</router-link>
          </el-menu-item>
          <el-menu-item index="2">News</el-menu-item>
          <el-menu-item index="3">Discuss</el-menu-item>
          <el-menu-item index="4">
            <router-link :to="{ name: 'problemList', params: {} }">Problems</router-link>
          </el-menu-item>
          <el-menu-item index="5">
            <router-link :to="{ name: 'status', params: {} }">Status</router-link>
          </el-menu-item>
          <el-menu-item index="6">Ranklist</el-menu-item>
          <el-menu-item index="7">Contests</el-menu-item>
          <el-menu-item index="8">FAQ</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="6">
        <el-menu class="el-menu-demo head" mode="horizontal">
          <el-button v-show="!uid" class="login" type="text" @click="execLogin">Login</el-button>
          <el-button v-show="!uid" class="register" type="text" @click="execRegister">Register</el-button>
          <el-button v-show="uid" class="login" type="text">{{ this.uid }}</el-button>
          <el-button v-show="uid" class="register" type="text" @click="userLogout">Logout</el-button>
          <el-button v-show="uid === 'admin'" class="admin" type="text">admin</el-button>
          <login :ifShow="loginDialog"></login>
          <register :ifShow="registerDialog"></register>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      left: '1'
    }
  },
  computed: {
    ...mapGetters([
      'uid',
      'loginDialog',
      'registerDialog'
    ])
  },
  methods: {
    ...mapMutations({
      execLogin: 'SHOW_LOGIN',
      execRegister: 'SHOW_REGISTER',
      logout: 'LOGOUT'
    }),
    userLogout () {
      this.logout()
      this.$message({
        type: 'success',
        message: '退出成功'
      })
    }
  },
  components: {
    Login,
    Register
  }
}
</script>

<style lang="stylus">
  .container
    box-shadow: 0 2px 3px hsla(0,0%,4%,.1)
    margin-bottom: 30px
  .head
    float: right
  .login, .logout, .register, .user, .admin
    height: 60px
    width: 80px
    color: #878d99
</style>
