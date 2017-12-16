<template lang="html">
  <div class="rank-wrap">
    <el-table :data="ranklist" class="eltable">
      <el-table-column label="Rank" type="index" :index="indexMethod" align="center" width="">
      </el-table-column>
      <el-table-column label="Username" align="center" width="">
        <template slot-scope="scope">
          <router-link :to="{ name: 'userInfo', params: { uid: scope.row.uid } }">
            <el-button type="text">{{ scope.row.uid }}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Nick" align="center" min-width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.nick }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Motto" align="center" min-width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.motto }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Solve" align="center">
        <template slot-scope="scope">
          <router-link :to="{ name: 'status', params: { uid: scope.row.uid, judge: 3 } }">
            <el-button type="text">{{ scope.row.solve }}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Submit" align="center" width="">
        <template slot-scope="scope">
          <router-link :to="{ name: 'status', params: { uid: scope.row.uid } }">
            <el-button type="text">{{ scope.row.submit }}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Ratio" align="center" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.solve / (scope.row.submit + 0.0000001) | formate }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page.sync="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout=" sizes, prev, pager, next, jumper"
      :total="sumRank"
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
      pageSize: 30
    }
  },
  computed: {
    ...mapGetters([
      'ranklist',
      'sumRank'
    ])
  },
  created () {
    this.getRanks()
  },
  methods: {
    getRanks () {
      let opt = {
        page: this.currentPage,
        pageSize: this.pageSize
      }
      this.$store.dispatch('updateRanklist', opt)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getRanks()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getRanks()
    },
    indexMethod (index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize
    }
  }
}
</script>

<style lang="stylus">
  .rank-wrap
    margin-bottom: 20px
    .el-table
      margin-bottom: 20px
    .el-table th
      padding: 8px 0
    .el-table td
      padding: 2px 0
</style>
