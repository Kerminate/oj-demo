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
          <!-- <el-menu-item index="1" @click="clickLogin">Login</el-menu-item> -->
          <!-- <el-menu-item index="2">Register</el-menu-item> -->
          <el-button class="login" type="text" @click="dialogVisible = true">Login</el-button>
          <el-button class="register" type="text" @click="dialogVisible = true">Register</el-button>
          <!-- <p class="login" @click="dialogVisible = true">Login</p> -->
          <!-- <p class="register">Register</p> -->
          <el-dialog title="Login" :visible.sync="dialogVisible" size="small" center>
            <el-row>
              <el-col :offset="1" :span="20">
                <el-form :model="loginForm" :rules="rules" label-width="100px" ref="loginForm">
                  <el-form-item label="username" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                  </el-form-item>
                  <el-form-item label="password" prop="password">
                    <el-input v-model="loginForm.password" type="password"></el-input>
                  </el-form-item>
                  <!-- <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                  </el-form-item> -->
                </el-form>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
              <el-button @click="resetForm('loginForm')">重置</el-button>
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
      dialogVisible: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能少', trigger: 'blur' },
          { min: 3, max: 16, message: '用户名在3到16位之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { // 验证通过
          let opt = this.loginForm
          if (opt.username === 'admin' && opt.password === 'admin') {
            this.$message({
              type: 'success',
              message: '登录成功'
            })
          } else {
            this.$message({
              type: 'info',
              message: '密码错误'
            })
          }
        } else {
          // 验证不通过
          return false
        }
      })
      this.dialogVisible = false
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
</style>
