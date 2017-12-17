<template lang="html">
  <div class="con-wrap">
    <el-table :data="contestList" class="eltable">
      <el-table-column label="Cid" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Start Time" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.create | timePretty }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Type" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.encrypt }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page.sync="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout=" sizes, prev, pager, next, jumper"
      :total="sumContest"
      :page-sizes="[20, 30, 40, 50]"
      :page-size="pageSize">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 20
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
