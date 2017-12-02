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
        <el-menu :default-active="right" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <!-- <el-menu-item index="1" @click="clickLogin">Login</el-menu-item> -->
          <!-- <el-menu-item index="2">Register</el-menu-item> -->
          <el-button class="login" type="text" @click="dialogVisible = true">Login</el-button>
          <el-button class="register" type="text" @click="dialogVisible = true">Register</el-button>
          <!-- <p class="login" @click="dialogVisible = true">Login</p> -->
          <!-- <p class="register">Register</p> -->
          <el-dialog title="提示" :visible.sync="dialogVisible" size="small">
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确定</el-button>
            </span>
          </el-dialog>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      left: '1',
      right: '0',
      dialogVisible: false,
      currentView: null
    }
  },
  methods: {
    clickLogin () {
      this.right = '0'
      this.dialogVisible = true
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="stylus">
  .container
    box-shadow: 0 2px 3px hsla(0,0%,4%,.1)
  .login, .register
    height: 60px
    width: 80px
    color: #878d99
    // margin: 0
    // height: 59px
    // line-height: 59px
    // display: inline-block
    // width: 80px
    // color: #878d99
    // border-bottom: 1px solid #fff
    // cursor: pointer
    // &:hover
    //   border-bottom: 1px solid blue
</style>
