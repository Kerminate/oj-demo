<template lang="html">
  <div class="con-wrap">
    <el-table :data="list" class="eltable">
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
      <el-table-column label="Delete" align="left">
        <template slot-scope="scope">
          <el-button type="text" @click="del(scope.row.cid)">delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page.sync="page"
      @size-change="sizeChange"
      @current-change="pageChange"
      layout="sizes, prev, pager, next, jumper"
      :total="sum"
      :page-sizes="[20, 30, 40, 50]"
      :page-size="pageSize">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import constant from '../util/constant'
import only from 'only'
import pickBy from 'lodash.pickby'
import api from '@/api'

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
    ...mapGetters('contest', [
      'list',
      'sum'
    ]),
    query () {
      const opt = only(this.$route.query, 'page pageSize type content')
      return pickBy(
        opt,
        x => x != null && x !== ''
      )
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      this.$store.dispatch('contest/find', this.query)
      const query = this.$route.query
      this.page = parseInt(query.page) || 1
      this.pageSize = parseInt(query.pageSize) || 20
    },
    reload (payload = {}) {
      const query = Object.assign(this.query, payload)
      this.$router.push({
        name: 'contestList',
        query
      })
    },
    sizeChange (val) {
      this.reload({ pageSize: val })
    },
    pageChange (val) {
      this.reload({ page: val })
    },
    del (val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.contest.delete({cid: val})
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration: 2000,
          showClose: true
        })
        this.fetch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 2000,
          showClose: true
        })
      })
    }
  },
  watch: {
    '$route' (to, from) {
      if (to !== from) this.fetch()
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
