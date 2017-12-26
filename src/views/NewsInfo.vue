<template lang="html">
  <div class="news">
    <h1>{{ news.title }}</h1>
    <h4>{{ news.create | timePretty }}</h4>
    <hr>
    <div class="news-cont" v-html="news.content"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('news', [
      'news'
    ])
  },
  created () {
    this.$store.dispatch('news/updateNew', this.$route.params)
  }
}
</script>

<style lang="stylus">
  .news
    .news-cont
      text-align: left
</style>
