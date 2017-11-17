<template>
  <div>
      <div class="header">
          <v-header :seller="seller"></v-header>
      </div>
      <div class="tab border-1px">
        <div class="tab-item">
          <a v-link="{ path: '/goods' }">商品</a>
        </div>
        <div class="tab-item">
          <a v-link="{ path: '/ratings' }">评价</a>
        </div>
        <div class="tab-item">
          <a v-link="{ path: '/seller' }">商家</a>
        </div>
      </div>
      <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header'

const ERR_OK = 0;

export default {
    data() {
        return {
            seller: {}
        };
    },
    // vue初始化之后，类似于window.onload
    created() {
        this.$http.get('/api/seller').then( (response) => {
            if (response.body.errno === ERR_OK) {
                this.seller = response.body.data;
            }
        });
    },
    components: {
      'v-header': header,
    }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    @import "./common/stylus/mixin.styl"
    .tab
      display: flex
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        text-align: center
        flex: 1
        & > a
          display: block
          font-size: 14px
          color: rgb(77,85,93)
          &.active
            color: rgb(240,20,20)
</style>
