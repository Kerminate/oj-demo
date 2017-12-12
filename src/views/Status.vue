<template lang="html">
  <div class="status-wrap">
    <el-row>
      <el-col :offset="1" :span="5">
        <el-col :span="6"><label>User</label></el-col>
        <el-col :span="15"><el-input v-model="uid" size="small" placeholder="username"></el-input></el-col>
      </el-col>
      <el-col :span="4">
        <el-col :span="6"><label>Pid</label></el-col>
        <el-col :span="15"><el-input v-model="pid" size="small" placeholder="pid"></el-input></el-col>
      </el-col>
      <el-col :span="7">
        <el-col :span="5"><label>Judge</label></el-col>
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
        <el-col :span="7"><label>User</label></el-col>
        <el-col :span="15">
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
        <el-button type="primary" size="small" @click="">Search</el-button>
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
          :total="sumStatus"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize">
        </el-pagination>
      </el-col>
    </el-row>
    <el-table :data="solutionList" class="eltable">
      <el-table-column label="SID" align="center" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.sid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="PID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Username" align="center">
        <template slot-scope="scope">
          <router-link :to="{ name: '', params: { } }">
            <el-button type="text">{{ scope.row.uid }}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Judge" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.judge }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Time" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Memory" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.memory }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Language" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.language }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Length" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.length }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Submit Time" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.create | timePretty}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      currentPage: 1,
      sumStatus: 1,
      pageSize: 10,
      uid: '',
      pid: '',
      judge: 'ALL',
      language: 'ALL',
      judgeList: [
        {
          value: '',
          label: 'ALL'
        },
        {
          value: 'Pending',
          label: 'Pending'
        },
        {
          value: 'Running & Judge',
          label: 'Running'
        },
        {
          value: 'CompileError',
          label: 'Compile Error'
        },
        {
          value: 'Accepted',
          label: 'Accepted'
        },
        {
          value: 'RuntimeError',
          label: 'Runtime Error'
        },
        {
          value: 'WrongAnswer',
          label: 'Wrong Answer'
        },
        {
          value: 'TimeLimitExceeded',
          label: 'Time Limit Exceeded'
        },
        {
          value: 'MemoryLimitExceed',
          label: 'Memory Limit Exceeded'
        },
        {
          value: 'OutputLimitExceed',
          label: 'Output Limit Exceeded'
        },
        {
          value: 'PresentationError',
          label: 'Presentation Error'
        },
        {
          value: 'SystemError',
          label: 'System Error'
        },
        {
          value: 'RejudgePending',
          label: 'Rejudge Pending'
        }
      ],
      languageList: [
        {
          value: 'ALL',
          label: 'ALL'
        },
        {
          value: 'C',
          label: 'C'
        },
        {
          value: 'C++',
          label: 'C++'
        },
        {
          value: 'Java',
          label: 'Java'
        }
      ]
    }
  },
  created () {
    this.getStatus()
  },
  computed: {
    ...mapGetters([
      'solutionList'
    ])
  },
  methods: {
    getStatus () {
      let opt = {
        page: this.currentPage,
        pageSize: this.pageSize
      }
      this.$store.dispatch('updateSolutionList', opt)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getStatus()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getStatus()
    }
  }
}
</script>

<style lang="stylus">
  .status-wrap
    label
      height: 32px
      line-height: 32px
</style>
