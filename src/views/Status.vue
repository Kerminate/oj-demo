<template lang="html">
  <div class="status-wrap">
    <el-row class="filter">
      <el-col :offset="1" :span="5">
        <el-col :span="6"><label>User</label></el-col>
        <el-col :span="15"><el-input v-model="uid" size="small" placeholder="username"></el-input></el-col>
      </el-col>
      <el-col :span="4">
        <el-col :span="6"><label>Pid</label></el-col>
        <el-col :span="15"><el-input v-model="pid" size="small" placeholder="pid"></el-input></el-col>
      </el-col>
      <el-col :span="6">
        <el-col :span="6"><label>Judge</label></el-col>
        <el-col :span="16">
          <el-select v-model="judge" placeholder="请选择" size="small">
            <el-option
              v-for="item in judgeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="4">
        <el-col :span="12"><label>Language</label></el-col>
        <el-col :span="12">
          <el-select v-model="language" placeholder="请选择" size="small">
            <el-option
              v-for="item in languageList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="small" @click="search">Search</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-pagination
          background
          :current-page.sync="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout=" sizes, prev, pager, next, jumper"
          :total="sumSolutions"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize">
        </el-pagination>
      </el-col>
    </el-row>
    <el-table :data="solutionList" class="eltable">
      <el-table-column label="SID" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.sid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="PID" align="left">
        <template slot-scope="scope">
          <router-link :to="{ name: 'problemInfo', params: { pid: scope.row.pid } }">
            <el-button type="text">{{ scope.row.pid }}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Username" align="left" min-width="120">
        <template slot-scope="scope">
          <router-link :to="{ name: 'userInfo', params: { uid: scope.row.uid } }">
            <el-button type="text">{{ scope.row.uid }}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Judge" align="left" min-width="140">
        <template slot-scope="scope">
          <span :class="color[scope.row.judge]">{{ result[scope.row.judge] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Time" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.time }} MS</span>
        </template>
      </el-table-column>
      <el-table-column label="Memory" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.memory }} KB</span>
        </template>
      </el-table-column>
      <el-table-column label="Language" align="left">
        <template slot-scope="scope">
          <router-link :to="{ name: '', params: { } }">
            <el-button @click="showDialog(scope.row)" type="text">{{ lang[scope.row.language] }}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Length" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.length }} B</span>
        </template>
      </el-table-column>
      <el-table-column label="Submit Time" align="left" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.create | timePretty}}</span>
        </template>
      </el-table-column>
    </el-table>
    <solution-code :ifShow="codeDialog"></solution-code>
  </div>
</template>

<script>
import SolutionCode from '@/components/SolutionCode.vue'
import { mapGetters } from 'vuex'
import constant from '../util/constant.js'

export default {
  data () {
    return {
      uid: this.$route.query.uid || '',
      pid: this.$route.query.pid || '',
      judge: this.$route.query.judge || '',
      language: this.$route.query.language || '',
      currentPage: parseInt(this.$route.query.page) || 1,
      pageSize: parseInt(this.$route.query.pageSize) || 30,
      judgeList: constant.judgeList,
      languageList: constant.languageList,
      result: constant.result,
      lang: constant.language,
      color: constant.color
    }
  },
  created () {
    this.getStatus()
  },
  computed: {
    ...mapGetters([
      'solutionList',
      'sumSolutions',
      'codeDialog'
    ])
  },
  methods: {
    showDialog (solution) {
      this.$store.commit('SHOW_CODE', solution)
    },
    getStatus () {
      const opt = {
        page: this.currentPage,
        pageSize: this.pageSize,
        uid: this.uid,
        pid: this.pid,
        judge: this.judge,
        language: this.language
      }
      this.$router.push({
        name: 'status',
        query: opt
      })
      this.$store.dispatch('updateSolutionList', opt)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getStatus()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getStatus()
    },
    search () {
      this.currentPage = 1
      this.getStatus()
    }
  },
  components: {
    SolutionCode
  }
}
</script>

<style lang="stylus">
  .status-wrap
    .filter
      margin-bottom: 20px
    label
      height: 32px
      line-height: 32px
    .el-table
      margin-top: 10px
      margin-bottom: 10px
    .el-table th
      padding: 8px 0
    .el-table td
      padding: 2px 0
</style>
