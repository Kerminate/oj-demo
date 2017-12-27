<template lang="html">
  <div class="rank-wrap">
    <el-table :data="list" class="eltable">
      <el-table-column label="Rank" type="index" :index="indexMethod" align="left" width="">
      </el-table-column>
      <el-table-column label="Username" align="left" width="">
        <template slot-scope="scope">
          <router-link :to="{ name: 'userInfo', params: { uid: scope.row.uid } }">
            <el-button type="text">{{ scope.row.uid }}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Nick" align="left" min-width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.nick }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Motto" align="left" min-width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.motto }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Solve" align="left">
        <template slot-scope="scope">
          <router-link :to="{ name: 'status', params: { uid: scope.row.uid, judge: 3 } }">
            <el-button type="text">{{ scope.row.solve }}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Submit" align="left" width="">
        <template slot-scope="scope">
          <router-link :to="{ name: 'status', params: { uid: scope.row.uid } }">
            <el-button type="text">{{ scope.row.submit }}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Ratio" align="left" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.solve / (scope.row.submit + 0.0000001) | formate }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page.sync="page"
      @size-change="sizeChange"
      @current-change="pageChange"
      layout=" sizes, prev, pager, next, jumper"
      :total="sum"
      :page-sizes="[20, 30, 40, 50]"
      :page-size="pageSize">
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import only from 'only'
import pickBy from 'lodash.pickby'

export default {
  data () {
    return {
      page: parseInt(this.$route.query.page) || 1,
      pageSize: parseInt(this.$route.query.pageSize) || 30
    }
  },
  computed: {
    ...mapGetters('ranklist', [
      'list',
      'sum'
    ]),
    query () {
      const opt = only(this.$route.query, 'page pageSize')
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
      this.$store.dispatch('ranklist/find', this.query)
      const query = this.$route.query
      this.page = parseInt(query.page) || 1
      this.pageSize = parseInt(query.pageSize) || 30
    },
    reload (payload = {}) {
      const query = Object.assign(this.query, payload)
      this.$router.push({
        name: 'ranklist',
        query
      })
    },
    sizeChange (val) {
      this.reload({ pageSize: val })
    },
    pageChange (val) {
      this.reload({ page: val })
    },
    indexMethod (index) {
      return index + 1 + (this.page - 1) * this.pageSize
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
  .rank-wrap
    margin-bottom: 20px
    .el-table
      margin-bottom: 20px
    .el-table th
      padding: 8px 0
    .el-table td
      padding: 2px 0
</style>
