<template lang="html">
  <div class="conrank-wrap">
    <el-table :data="tableData" border>
      <el-table-column label="Rank" type="index" :index="indexMethod" align="left" width="">
      </el-table-column>
      <el-table-column label="" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Nick" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.nick }}</span>
        </template>
      </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
</style>
