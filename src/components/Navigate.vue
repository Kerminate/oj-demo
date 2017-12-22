<template lang="html">
  <div>
    <el-row class="container">
      <el-col :offset="2" :span="16">
        <el-menu :default-active="left" class="el-menu-demo" mode="horizontal" active-text-color="#B12CCC">
          <el-menu-item index="/">
            <router-link :to="{ name: 'home', params: {} }">
              <p>Home</p>
            </router-link>
          </el-menu-item>
          <el-menu-item index="news">News</el-menu-item>
          <el-menu-item index="problem">
            <router-link :to="{ name: 'problemList', params: {} }">
              <p>Problems</p>
            </router-link>
          </el-menu-item>
          <el-menu-item index="status">
            <router-link :to="{ name: 'status', params: {} }">
              <p>Status</p>
            </router-link>
          </el-menu-item>
          <el-menu-item index="ranklist">
            <router-link :to="{ name: 'ranklist', params: {} }">
              <p>Ranklist</p>
            </router-link>
          </el-menu-item>
          <el-menu-item index="contestList">
            <router-link :to="{ name: 'contestList', params: {} }">
              <p>Contests</p>
            </router-link>
          </el-menu-item>
          <el-menu-item index="faq">FAQ</el-menu-item>
          <el-submenu index="/">
            <template slot="title">Admin</template>
            <el-menu-item index="admin/problem/add">
              <router-link :to="{ name: 'problemAdd', params: {} }">Create Problems</router-link>
            </el-menu-item>
            <el-menu-item index="admin/contest/add">
              <router-link :to="{ name: 'contestAdd', params: {} }">Create Contests</router-link>
            </el-menu-item>
            <el-menu-item index="9-3">User Management</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <el-menu class="el-menu-demo head" mode="horizontal">
          <el-button v-show="!user" class="login" type="text" @click="execLogin">Login</el-button>
          <el-button v-show="!user" class="register" type="text" @click="execRegister">Register</el-button>
          <el-button v-show="user" class="login" type="text">{{ user }}</el-button>
          <el-button v-show="user" class="register" type="text" @click="userLogout">Logout</el-button>
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
      'user',
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
        message: '退出成功',
        duration: 2000,
        showClose: true
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
    .el-menu--horizontal
      border-bottom: none
    p
      line-height: 60px
      height: 60px
      margin: 0
    .head
      float: right
    .login, .logout, .register, .user, .admin
      height: 60px
      width: 80px
      color: #878d99
</style>
