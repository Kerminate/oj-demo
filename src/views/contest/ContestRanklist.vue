<template lang="html">
  <div class="conrank-wrap">
    <table>
      <tr>
        <th>#</th>
        <th>User</th>
        <th>Nick</th>
        <th>Solve</th>
        <th>Penalty</th>
        <th v-for="(item, index) in contestPrime">
          {{ index + 1 }}
        </th>
      </tr>
      <tr v-for="(item, index) in contestRank">
        <td>{{ index + 1 }}</td>
        <td>{{ item.uid }}</td>
        <td>{{ item.nick }}</td>
        <td>{{ item.ac }}</td>
        <td>{{ item.time | timeContest }}</td>
        <td v-for="(item2, index2) in item.list">
          <div v-if="item2.create > 0">
            {{ item2.create | timeContest }}<span v-if="item2.submit">({{ item2.submit }})</span>
          </div>
          <div v-if="item2.create === 0">
            <span v-if="item2.submit">-{{ item2.submit }}</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'contestRank',
      'contestPrime'
    ])
  },
  created () {
    this.$store.dispatch('getContestRank', this.$route.params)
  }
}
</script>

<style lang="stylus">
</style>
