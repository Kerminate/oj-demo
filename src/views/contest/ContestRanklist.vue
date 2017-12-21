<template lang="html">
  <div class="conrank-wrap">
    hello!
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'contestRank'
    ])
  },
  created () {
    this.$store.dispatch('getContestRank', this.$route.params)
  }
}
</script>

<style lang="stylus">
</style>
