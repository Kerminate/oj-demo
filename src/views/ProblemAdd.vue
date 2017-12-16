<template lang="html">
  <div class="proadd-wrap">
    <!-- <div class="title">
      <label for="">Title</label>
      <el-input size="small"></el-input>
    </div>
    <div class="time-memory">
      <div class="time">
        <label for="">Time</label>
        <el-input size="small"></el-input>

      </div>
      <div class="memory">
        <label for="">Memory</label>
        <el-input size="small"></el-input>
      </div>
    </div> -->
    <el-row>
      <el-col :span="23">
        <el-input v-model="title" size="small">
          <template slot="prepend">Title</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-input v-model="time" size="small">
          <template slot="prepend">Time</template>
          <template slot="append">MS</template>
        </el-input>
      </el-col>
      <el-col :offset="1" :span="11">
        <el-input v-model="memory" size="small">
          <template slot="prepend">Memory</template>
          <template slot="append">KB</template>
        </el-input>
      </el-col>
    </el-row>
    <div class="label">Description</div>
    <el-row>
      <el-col :span="23">
        <quill-editor ref="myTextEditor" v-model="description" :config="editorOption"></quill-editor>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  data () {
    return {
      title: '',
      time: 1000,
      memory: 32768,
      description: `<h2>I am Example</h2>`,
      editorOption: {}
    }
  },
  methods: {
    onEditorChange ({ editor, html, text }) {
      this.content = html
    }
  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quillEditor
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style lang="stylus">
  .proadd-wrap
    .el-input
      margin-bottom: 14px
      .el-input-group__append, .el-input-group__prepend
        color: #2c3e50
        font-size: 14px
    .label
      text-align:left
      margin-bottom: 10px
    .description
      height: 400px
    // label
    //   line-height: 32px
    //   height: 32px
    //   padding: 0 10px
    // .title
    //   display: flex
    //   margin: 0 20px 20px 20px
    // .time-memory
    //   display: flex
    //   justify-content: space-around
    //   margin: 0 20px
    //   .time
    //     display: flex
    //     width: 49%
    //   .memory
    //     display: flex
    //     width: 49%
</style>
