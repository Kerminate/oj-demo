<template lang="html">
  <div>
    <el-row class="container">
      <el-col :offset="2" :span="16">
        <el-menu :default-active="left" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">Home</el-menu-item>
          <el-menu-item index="2">Discuss</el-menu-item>
          <el-menu-item index="3">Problems</el-menu-item>
          <el-menu-item index="4">Status</el-menu-item>
          <el-menu-item index="5">Ranklist</el-menu-item>
          <el-menu-item index="6">Contests</el-menu-item>
          <el-menu-item index="7">FAQ</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-button class="login" type="text" @click="openLogin">Login</el-button>
          <el-button class="register" type="text" @click="openRegister">Register</el-button>
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

export default {
  data () {
    return {
      left: '1',
      dialogVisible1: false,
      dialogVisible2: false
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    openLogin () {
      this.dialogVisible1 = true
    },
    closeLogin () {
      this.dialogVisible1 = false
    },
    openRegister () {
      this.dialogVisible2 = true
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
  .login, .register
    height: 60px
    width: 80px
    color: #878d99
</style>
