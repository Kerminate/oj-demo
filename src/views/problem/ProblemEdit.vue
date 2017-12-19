<template lang="html">
  <div class="proadd-wrap">
    <el-row>
      <el-col :span="23">
        <el-input v-model="problem.title" size="small">
          <template slot="prepend">Title</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-input v-model="problem.time" size="small">
          <template slot="prepend">Time</template>
          <template slot="append">MS</template>
        </el-input>
      </el-col>
      <el-col :offset="1" :span="11">
        <el-input v-model="problem.memory" size="small">
          <template slot="prepend">Memory</template>
          <template slot="append">KB</template>
        </el-input>
      </el-col>
    </el-row>
    <div class="label">Description</div>
    <el-row>
      <el-col :span="23">
        <quill-editor ref="myTextEditor" v-model="problem.description" :config="editorOption"></quill-editor>
      </el-col>
    </el-row>
    <div class="label">Input</div>
    <el-row>
      <el-col :span="23">
        <quill-editor ref="myTextEditor" v-model="problem.input" :config="editorOption"></quill-editor>
      </el-col>
    </el-row>
    <div class="label">Output</div>
    <el-row>
      <el-col :span="23">
        <quill-editor ref="myTextEditor" v-model="problem.output" :config="editorOption"></quill-editor>
      </el-col>
    </el-row>
    <div class="label">Hint</div>
    <el-row>
      <el-col :span="23">
        <quill-editor ref="myTextEditor" v-model="problem.hint" :config="editorOption"></quill-editor>
      </el-col>
    </el-row>
    <div class="label">Sample Input</div>
    <el-row>
      <el-col :span="23">
        <el-input type="textarea" :rows="8" v-model="problem.in"></el-input>
      </el-col>
    </el-row>
    <div class="label">Sample Output</div>
    <el-row>
      <el-col :span="23">
        <el-input type="textarea" :rows="8" v-model="problem.out"></el-input>
      </el-col>
    </el-row>
    <el-button type="primary" @click="submit" @keyup.enter="submit">Submit</el-button>
  </div>
</template>

<script>
import api from '@/api.js'
import { mapGetters } from 'vuex'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  data () {
    return {
      editorOption: {}
    }
  },
  computed: {
    ...mapGetters([
      'problem'
    ])
  },
  created () {
    this.$store.dispatch('getProblem', { pid: this.$route.params.pid })
  },
  methods: {
    submit () {
      api.updateProblem(this.problem).then(({ data }) => {
        if (data.success) {
          this.$message({
            type: 'success',
            message: '提交成功',
            duration: 2000,
            showClose: true
          })
          this.$router.push({name: 'problemInfo', params: { pid: data.pid }})
        }
      })
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style lang="stylus">
  .proadd-wrap
    margin-bottom: 20px
    .el-input
      margin-bottom: 14px
      .el-input-group__append, .el-input-group__prepend
        color: #2c3e50
        font-size: 14px
    .label
      text-align:left
      margin-bottom: 10px
    .quill-editor
      text-align: left
      height: 220px
      margin-bottom: 80px
    .el-textarea
      margin-bottom: 20px
</style>
