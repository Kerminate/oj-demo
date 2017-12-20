<template lang="html">
  <div class="con-wrap">
    <el-table :data="contestList" class="eltable">
      <el-table-column label="Cid" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.cid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" align="left" min-width="100">
        <template slot-scope="scope">
          <router-link :to="{ name: 'contest.overview', params: { cid: scope.row.cid } }">
            <el-button type="text">{{ scope.row.title }}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Status" align="left">
        <template slot-scope="scope">
          <span>{{ status[scope.row.status] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Start Time" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.create | timePretty }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Type" align="left">
        <template slot-scope="scope">
          <span>{{ type[scope.row.encrypt] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page.sync="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="sizes, prev, pager, next, jumper"
      :total="sumContest"
      :page-sizes="[20, 30, 40, 50]"
      :page-size="pageSize">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import constant from '../util/constant'

export default {
  data () {
    return {
      currentPage: parseInt(this.$route.query.page) || 1,
      pageSize: parseInt(this.$route.query.pageSize) || 20,
      status: constant.contestStatus,
      type: constant.contestType
    }
  },
  computed: {
    ...mapGetters([
      'contestList',
      'sumContest'
    ])
  },
  created () {
    this.getContestList()
  },
  methods: {
    getContestList () {
      let opt = {
        page: this.currentPage,
        pageSize: this.pageSize
      }
      this.$router.push({
        name: 'contestList',
        query: opt
      })
      this.$store.dispatch('updateContestList', opt)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getContestList()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getContestList()
    }
  }
}
</script>

<style lang="stylus">
.con-wrap
  margin-bottom: 20px
  .el-table
    margin-bottom: 20px
  .el-table th
    padding: 8px 0
  .el-table td
    padding: 2px 0
</style>
