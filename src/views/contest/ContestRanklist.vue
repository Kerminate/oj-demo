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
        <td class="straight">{{ item.time | timeContest }}</td>
        <template v-for="(item2, index2) in item.list">
          <td v-if="item2.create > 0" :class="[ contestPrime[index2] === item.uid ? 'prime' : 'normal']">
            {{ item2.create | timeContest }}<span v-if="item2.submit">({{ item2.submit }})</span>
          </td>
          <td v-if="item2.create === 0" :class="{'red': item2.submit}">
            <span v-if="item2.submit">-{{ item2.submit }}</span>
          </td>
        </template>
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
  .conrank-wrap
    table
      width: 100%
      border-collapse: collapse
      border-spacing: 0
      th, td
        border: 1px solid #dbdbdb
        padding: 8px 4px
    .straight
      nowrap: nowrap
    .prime
      color: #fff
      background-color: #3273dc
      word-wrap: break-word
      word-break:break-all
      text-align: left
    .normal
      color: #fff
      background-color: #23d160
      word-wrap: break-word
      word-break:break-all
      text-align: left
    .red
      color: red
</style>
