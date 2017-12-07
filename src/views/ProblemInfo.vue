<template lang="html">
  <div class="pro-wrap">
    <el-row type="flex" justify="center">
      <el-col><h1>{{ problem.title }}</h1></el-col>
      <el-col>
        <h3>Time Limit: 1000MS</h3>
        <h3>Memory Limit: 32768KB</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col><h2>Description</h2></el-col>
      <el-col><h3>Calculate A + B.</h3></el-col>
    </el-row>
    <el-row>
      <el-col><h2>Input</h2></el-col>
      <el-col><h3>Each line will contain two integers A and B. Process to end of file.</h3></el-col>
    </el-row>
    <el-row>
      <el-col><h2>Output</h2></el-col>
      <el-col><h3>For each case, output A + B in one line.</h3></el-col>
    </el-row>
    <el-row>
      <el-col><h2>Sample Input</h2></el-col>
      <el-col><h3>1 2</h3></el-col>
    </el-row>
    <el-row>
      <el-col><h2>Sample Output</h2></el-col>
      <el-col><h3>3</h3></el-col>
    </el-row>
    <el-row>
      <el-col><h2>Hint</h2></el-col>
      <el-col><h3>If you are not familiar about the basic input and output in ACM OJ. Please refer to http://chenqiangjsj.blog.51cto.com/2331729/550144/。And more practices are in http://acm.hdu.edu.cn/problemclass.php?id=171.
</h3></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'problem'
    ])
  },
  created () {
    console.log(this.$route.params)
    this.$store.dispatch('updateProblem', this.$route.params)
    console.log(this.problem)
  }
  // beforeRouteEnter (to, from, next) {
  //   let param = to.params
  //   console.log()
  //   if (param) {
  //     next(vm => {
  //       vm.pid = parseInt(param.pid)
  //     })
  //   } else {
  //     next()
  //   }
  // },
  // mounted () {
  //   console.log(this.pid)
  //   this.$store.dispatch('updateProblem', this.pid)
  // }
}
</script>

<style lang="css">
</style>
