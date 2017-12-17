<template lang="html">
  <div class="sub-wrap">
    <el-row type="flex" justify="start">
      <el-col :span="2">
        <el-select v-model="language" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row type="flex" justify="start">
      <el-col :span="18">
        <el-input type="textarea" :rows="20" v-model="stuCode"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="start">
      <el-col :span="2">
        <el-button @click="" type="primary">Submit</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [
        {
          value: 'C',
          label: 'C'
        },
        {
          value: 'C++',
          label: 'C++'
        },
        {
          value: 'JAVA',
          label: 'JAVA'
        }
      ],
      language: 'C++',
      stuCode: ''
    }
  }
}
</script>

<style lang="stylus">
  .sub-wrap
    .el-col
      margin-bottom: 10px
</style>
