<template lang="html">
  <el-dialog title="Login" :visible.sync="ifShow" center :before-close="handleClose">
    <el-row>
      <el-col :offset="1" :span="20">
        <el-form :model="loginForm" :rules="rules" label-width="120px" ref="loginForm">
          <el-form-item label="username" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="password" prop="password">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props: {
    ifShow: {
      type: Boolean
    }
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能少', trigger: 'change' },
          { min: 5, max: 20, message: '用户名在5到20位之间', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('closeLogin')
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
      this.$emit('closeLogin')
    }
  }
}
</script>

<style lang="stylus">
</style>
