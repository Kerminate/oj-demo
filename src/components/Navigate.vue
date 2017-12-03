<template lang="html">
  <div>
    <el-row class="container">
      <el-col :offset="2" :span="14">
        <el-menu :default-active="left" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">Home</el-menu-item>
          <el-menu-item index="2">Discuss</el-menu-item>
          <el-menu-item index="3">Problems</el-menu-item>
          <el-menu-item index="4">Status</el-menu-item>
          <el-menu-item index="5">Ranklist</el-menu-item>
          <el-menu-item index="6">Contests</el-menu-item>
          <el-menu-item index="7">FAQ</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="6">
        <el-menu class="el-menu-demo head" mode="horizontal">
          <el-button class="login" type="text" @click="openLogin">{{ this.loginText }}</el-button>
          <el-button class="register" type="text" @click="openRegister">{{ this.registerText }}</el-button>
          <el-button v-if="this.username === 'admin'" class="admin" type="text">admin</el-button>
          <login :ifShow="dialogVisible1" @closeLogin="closeLogin"></login>
          <register :ifShow="dialogVisible2" @closeRegister="closeRegister"></register>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      left: '1',
      dialogVisible1: false,
      dialogVisible2: false
    }
  },
  computed: {
    ...mapGetters({
      username: 'username'
    }),
    loginText () {
      if (this.username) {
        return this.username
      } else {
        return 'Login'
      }
    },
    registerText () {
      if (this.username) {
        return 'Logout'
      } else {
        return 'Register'
      }
    }
  },
  methods: {
    openLogin () {
      if (this.username) {
      } else {
        this.dialogVisible1 = true
      }
    },
    closeLogin () {
      this.dialogVisible1 = false
    },
    openRegister () {
      if (this.username) {
        this.$store.dispatch('UserLogout')
        if (!this.username) {
          this.$message({
            type: 'success',
            message: '登出成功'
          })
        } else {
          this.$message({
            type: 'info',
            message: '登出失败'
          })
        }
      } else {
        this.dialogVisible2 = true
      }
    },
    closeRegister () {
      this.dialogVisible2 = false
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
