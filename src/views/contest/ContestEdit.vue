<template lang="html">
  <div class="conadd-wrap">
    <el-row type="flex" justify="start">
      <el-col :span="2">Title</el-col>
      <el-col :span="21">
        <el-input v-model="contest.title" size="small"></el-input>
      </el-col>
    </el-row>
    <el-row  type="flex" justify="start">
      <el-col :span="2">Start Time</el-col>
      <el-col :span="2">
        <el-date-picker
          v-model="contest.start"
          type="datetime"
          placeholder="选择日期时间"
          size="small">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row  type="flex" justify="start">
      <el-col :span="2">End Time</el-col>
      <el-col :span="2">
        <el-date-picker
          v-model="contest.end"
          type="datetime"
          placeholder="选择日期时间"
          size="small">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row type="flex" justify="start">
      <el-col :span="2">Type</el-col>
      <el-select v-model="contest.encrypt" placeholder="请选择" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-row>
    <el-row v-if="contest.encrypt === 3">
      <el-col :span="23">
        <el-input v-model="contest.argument" size="small"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23"><hr></el-col>
    </el-row>
    <el-row>
      <el-col :span="23">
        <draggable v-model="contest.list">
          <transition-group name="list">
            <div v-for="(item, index) in contest.list" :key="index" class="list-item">
              <div>{{ item }} -- {{ jobs.get(item) }}</div>
              <i class="el-icon-error" @click="removeJob(index)"></i>
            </div>
          </transition-group>
        </draggable>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="21">
        <el-input v-model="contest.problem" size="small" placeholder="Add a pid" @keyup.enter.native="add"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="add" size="small">Add</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23"><hr></el-col>
    </el-row>
    <el-button type="primary" @click="submit">Submit</el-button>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import api from '@/api'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      jobs: new Map(),
      options: [
        {
          value: 1,
          label: 'Public'
        },
        {
          value: 2,
          label: 'Private'
        },
        {
          value: 3,
          label: 'Password'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('contest', {
      contest: 'one',
      overview: 'overview'
    })
  },
  created () {
    this.$store.dispatch('contest/find', { cid: this.$route.params.cid })
      .then(() => {
        this.overview.forEach((item) => {
          this.jobs.set(item.pid, item.title)
        })
      })
  },
  methods: {
    add () {
      this.$store.dispatch('problem/getProblem', { pid: this.contest.problem })
        .then((data) => {
          this.contest.list.push(data.pid)
          this.jobs.set(data.pid, data.title)
        })
      this.contest.problem = ''
    },
    submit () {
      api.contest.update(this.contest).then(({ data }) => {
        if (data.success) {
          this.$message({
            type: 'success',
            message: '提交成功',
            duration: 2000,
            showClose: true
          })
          this.$router.push({name: 'contest.overview', params: { cid: data.cid }})
        }
      })
    },
    removeJob (index) {
      this.contest.list.splice(index, 1)
    }
  },
  components: {
    draggable
  }
}
</script>

<style lang="stylus">
  .conadd-wrap
    .el-row
      margin-bottom: 14px
      .el-col
        line-height: 32px
        text-align: left
      hr
        background-color: #dbdbdb
        border: none
        height: 1px
      .el-button
        margin-left: 20px
        padding: 8px 15px
        font-size: 14px
    .list-item
      display: flex
      justify-content: space-between
      padding: 14px 20px
      margin-bottom: 14px
      background-color: #f2f2f2
    .el-icon-error
      line-height: 20px
      color: #c3c2c2
      cursor: pointer
      &:hover
        font-size: 20px
</style>
