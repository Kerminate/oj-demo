<template lang="html">
  <div class="home-wrap">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="slide1">Slide 1</swiper-slide>
      <swiper-slide class="slide2">Slide 2</swiper-slide>
      <swiper-slide class="slide3">Slide 3</swiper-slide>
      <swiper-slide class="slide4">Slide 4</swiper-slide>
      <swiper-slide class="slide5">Slide 5</swiper-slide>
      <swiper-slide class="slide6">Slide 6</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <div class="message">
      <ul>
        <li v-for="(item, index) in list">
          <router-link :to="{ name: 'newsInfo', params: { nid: item.nid } }">
            <span>{{ item.title }}</span>
            <i class="el-icon-arrow-right"></i>
          </router-link>
          <p>{{ item.create | timePretty }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      currentPage: 1,
      pageSize: 5
    }
  },
  computed: {
    ...mapGetters('news', [
      'list'
    ])
  },
  created () {
    let opt = {
      page: this.currentPage,
      pageSize: this.pageSize
    }
    this.$store.dispatch('news/find', opt)
  }
}
</script>

<style lang="stylus">
  .home-wrap
    .swiper
      height: 300px
      .slide1
        background-image:url('../../mock/images/bg1.png')
      .slide2
        background-image:url('../../mock/images/bg2.png')
      .slide3
        background-image:url('../../mock/images/bg3.png')
      .slide4
        background-image:url('../../mock/images/bg4.png')
      .slide5
        background-image:url('../../mock/images/bg5.png')
      .slide6
        background-image:url('../../mock/images/bg6.png')
    .message
      text-align: left
      li
        margin-bottom: 10px
        span
          margin-right: 10px
        .el-icon-arrow-right
          font-weight: bold
</style>
