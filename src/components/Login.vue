<template lang="html">
  <el-dialog title="Login" :visible.sync="loginDialog" :before-close="execDialog" center>
    <el-row>
      <el-col :offset="1" :span="20">
        <el-form :model="loginForm" :rules="rules" label-width="120px" ref="loginForm">
          <el-form-item label="uid" prop="uid">
            <el-input v-model="loginForm.uid"></el-input>
          </el-form-item>
          <el-form-item label="pwd" prop="pwd">
            <el-input v-model="loginForm.pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
// import api from '@/api.js'

export default {
  props: {
    ifShow: {
      type: Boolean
    }
  },
  data () {
    return {
      loginForm: {
        uid: '',
        pwd: ''
      },
      rules: {
        uid: [
          { required: true, message: '用户名不能少', trigger: 'change' },
          { min: 5, max: 20, message: '用户名在5到20位之间', trigger: 'change' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'loginDialog'
    ])
  },
  methods: {
    ...mapMutations({
      execDialog: 'SHOW_LOGIN'
    }),
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { // 验证通过
          let opt = this.loginForm
          this.$store.dispatch('UserLogin', opt).then(data => {
            // 账号不存在
            if (data.info === false) {
              this.$message({
                type: 'info',
                message: '账号不存在',
                duration: 2000,
                showClose: true
              })
              return false
            }
            // 账号存在
            if (data.success) {
              this.$message({
                type: 'success',
                message: '登录成功',
                duration: 2000,
                showClose: true
              })
              // // 如果用户手动输入"/"那么会跳转到这里来，即this.$route.query.redirect有参数
              // let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/')
              // // 跳转到指定的路由
              // this.$router.push({
              //   path: redirectUrl
              // })
            } else {
              this.$message({
                type: 'info',
                message: '密码错误！',
                duration: 2000,
                showClose: true
              })
            }
          })
        } else {
          // 验证不通过
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus">
</style>
