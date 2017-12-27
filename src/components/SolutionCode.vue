<template lang="html">
  <div class="code">
    <el-dialog id="dialog" class="dialog" :visible.sync="codeDialog" :before-close="closeDialog" center>
      <pre><code v-html="solution.code"></code></pre>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      // height: 0
    }
  },
  computed: {
    ...mapGetters('solution', {
      codeDialog: 'codeDialog',
      solution: 'one'
    })
  },
  methods: {
    ...mapMutations('solution', {
      closeDialog: 'CLOSE_CODE'
    })
  },
  created () {
    // console.log(window.innerHeight)
    // console.log(document.documentElement.clientHeight)
    // console.log(document.body.offsetHeight)
    // let height = window.innerHeight || document.body.offsetHeight
    // let opt = document.getElementsByClassName('el-dialog__body')
    // console.log(opt)
    // opt[0].style.height = 0.8 * height + 'px'
  }
}
</script>

<style lang="stylus">
  .code
    .el-dialog__header
      padding: 0
    .el-dialog__body
      height: 500px
      overflow: auto
</style>
