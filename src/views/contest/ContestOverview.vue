<template lang="html">
  <div class="conover-wrap">
    <h3>{{ contest.title }}</h3>
    <p>Start Time:&nbsp;&nbsp;{{ contest.create | timePretty }}</p>
    <p>End Time:&nbsp;&nbsp;{{ contest.end | timePretty }}</p>
    <el-table :data="contestOverview" class="eltable">
      <el-table-column label="#" align="left" width="">
        <template slot-scope="scope">
          <i class="el-icon-check" v-show="scope.row.isdone"></i>
        </template>
      </el-table-column>
      <el-table-column label="ID" type="index" align="left">
      </el-table-column>
      <el-table-column label="Title" align="left">
        <template slot-scope="scope">
          <router-link :to="{ name: 'contestProblem', params: { cid: scope.row.cid, id: scope.$index + 1 } }">
            <el-button type="text">{{ scope.row.title }}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Ratio" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.solve / (scope.row.submit + 0.0000001) | formate }}</span>
          ({{ scope.row.solve }} / {{ scope.row.submit }})
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'contest',
      'contestOverview'
    ])
  },
  created () {
    this.$store.dispatch('getContest', this.$route.params)
  }
}
</script>

<style lang="stylus">
  .conover-wrap
    .eltable
      margin-bottom: 20px
    .el-table th
      padding: 8px 0
    .el-table td
      padding: 2px 0
</style>
