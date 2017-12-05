<template>
  <div id="app">
    <navigate></navigate>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navigate from '@/components/Navigate.vue'

export default {
  name: 'app',
  components: {
    Navigate
  }
}
</script>

<style lang="stylus">
  body
    margin: 0
  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
  .main
    margin-left: 8%
    margin-right: 8%
</style>
