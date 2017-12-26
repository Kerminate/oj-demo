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
          :current-page.sync="page"
          @size-change="sizeChange"
          @current-change="pageChange"
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
import SolutionCode from '@/components/SolutionCode'
import { mapGetters } from 'vuex'
import constant from '../util/constant'
import only from 'only'
import { purify } from '@/util/helper'

export default {
  data () {
    return {
      uid: this.$route.query.uid || '',
      pid: this.$route.query.pid || '',
      judge: this.$route.query.judge || '',
      language: this.$route.query.language || '',
      page: parseInt(this.$route.query.page) || 1,
      pageSize: parseInt(this.$route.query.pageSize) || 30,
      judgeList: constant.judgeList,
      languageList: constant.languageList,
      result: constant.result,
      lang: constant.language,
      color: constant.color
    }
  },
  created () {
    this.fetch()
  },
  computed: {
    ...mapGetters('solution', [
      'solutionList',
      'sumSolutions',
      'codeDialog'
    ]),
    query () {
      const opt = only(this.$route.query, 'page pageSize uid pid language judge')
      return purify(opt)
    }
  },
  methods: {
    showDialog (solution) {
      this.$store.commit('solution/SHOW_CODE', solution)
    },
    fetch () {
      const query = this.$route.query
      this.$store.dispatch('solution/updateSolutionList', query)
      this.page = parseInt(query.page) || 1
      this.pageSize = parseInt(query.pageSize) || 30
      this.uid = query.uid
      this.pid = query.pid || ''
      this.judge = query.judge || ''
      this.language = query.language || ''
    },
    reload (payload = {}) {
      // console.log(this.$route.query)
      // console.log(this.query)
      const query = Object.assign(this.query, purify(payload))
      // console.log(query)
      // console.log(this.$route.query)
      this.$router.push({
        name: 'status',
        query
      })
    },
    search (val) {
      this.reload({
        page: 1,
        uid: this.uid,
        pid: this.pid,
        language: this.language,
        judge: this.judge
      })
    },
    sizeChange (val) {
      this.reload({ pageSize: val })
    },
    pageChange (val) {
      this.reload({ page: val })
    }
  },
  watch: {
    '$route' (to, from) {
      if (to !== from) {
        this.fetch()
      }
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
