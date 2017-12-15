<template lang="html">
  <div class="rank-wrap">
    <el-table :data="ranklist" class="eltable">
      <el-table-column label="Rank" type="index" align="center" width="70">
      </el-table-column>
      <el-table-column label="Username" align="center" width="170">
        <template slot-scope="scope">
          <router-link :to="{ name: 'userInfo', params: { uid: scope.row.uid } }">
            <el-button type="text">{{ scope.row.uid }}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Nick" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nick }} MS</span>
        </template>
      </el-table-column>
      <el-table-column label="Motto" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.motto }} KB</span>
        </template>
      </el-table-column>
      <el-table-column label="Solve" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.solve }} B</span>
        </template>
      </el-table-column>
      <el-table-column label="Submit" align="center" width="70">
        <template slot-scope="scope">
          <span>{{ lang[scope.row.submit] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ratio" align="center" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.solve / scope.row.submit }}</span>
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
      'ranklist',
      'sumRank'
    ])
  },
  created () {
    this.$store.dispatch('updateRanklist')
  }
}
</script>

<style lang="css">
</style>
