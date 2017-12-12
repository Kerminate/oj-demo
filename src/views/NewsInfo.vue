<template lang="html">
  <div class="news">
    <h1>{{ news.title }}</h1>
    <h3>{{ news.create | timePretty }}</h3>
    <hr>
    <div class="news-cont" v-html="news.content"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'news'
    ])
  },
  created () {
    this.$store.dispatch('updateNew', this.$route.params)
  }
}
</script>

<style lang="stylus">
  .news
    .news-cont
      text-align: left
</style>
