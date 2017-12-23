<template lang="html">
  <div class="proadd-wrap">
    <el-row>
      <el-col :span="23">
        <el-input v-model="form.title" size="small">
          <template slot="prepend">Title</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-input v-model="form.time" size="small">
          <template slot="prepend">Time</template>
          <template slot="append">MS</template>
        </el-input>
      </el-col>
      <el-col :offset="1" :span="11">
        <el-input v-model="form.memory" size="small">
          <template slot="prepend">Memory</template>
          <template slot="append">KB</template>
        </el-input>
      </el-col>
    </el-row>
    <div class="label">Description</div>
    <el-row>
      <el-col :span="23">
        <quill-editor ref="myTextEditor" v-model="form.description" :config="editorOption"></quill-editor>
      </el-col>
    </el-row>
    <div class="label">Input</div>
    <el-row>
      <el-col :span="23">
        <quill-editor ref="myTextEditor" v-model="form.input" :config="editorOption"></quill-editor>
      </el-col>
    </el-row>
    <div class="label">Output</div>
    <el-row>
      <el-col :span="23">
        <quill-editor ref="myTextEditor" v-model="form.output" :config="editorOption"></quill-editor>
      </el-col>
    </el-row>
    <div class="label">Hint</div>
    <el-row>
      <el-col :span="23">
        <quill-editor ref="myTextEditor" v-model="form.hint" :config="editorOption"></quill-editor>
      </el-col>
    </el-row>
    <div class="label">Sample Input</div>
    <el-row>
      <el-col :span="23">
        <el-input type="textarea" :rows="8" v-model="form.in"></el-input>
      </el-col>
    </el-row>
    <div class="label">Sample Output</div>
    <el-row>
      <el-col :span="23">
        <el-input type="textarea" :rows="8" v-model="form.out"></el-input>
      </el-col>
    </el-row>
    <el-button type="primary" @click="submit" @keyup.enter="submit">Submit</el-button>
  </div>
</template>

<script>
import api from '@/api.js'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  data () {
    return {
      form: {
        title: '',
        time: 1000,
        memory: 32768,
        description: '',
        input: '',
        output: '',
        hint: '',
        in: '',
        out: ''
      },
      editorOption: {}
    }
  },
  methods: {
    // onEditorChange ({ editor, html, text }) {
    //   this.content = html
    // },
    submit () {
      api.problem.create(this.form).then(({ data }) => {
        if (data.success) {
          this.$message({
            type: 'success',
            message: '提交成功',
            duration: 2000,
            showClose: true
          })
          this.$router.push({name: 'problemInfo', params: { pid: data.pid }})
        } else {
          this.$message({
            type: 'info',
            message: '提交失败',
            duration: 2000,
            showClose: true
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '提交失败',
          duration: 2000,
          showClose: true
        })
      })
    }
  },
  computed: {
    // editor () {
    //   return this.$refs.myTextEditor.quill
    // }
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
