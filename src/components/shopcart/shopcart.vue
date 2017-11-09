<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo">
                        <span class="icon-shopping_cart"></span>
                    </div>
                    <div class="num">0</div>
                </div>
                <div class="price">0元</div>
                <div class="desc">另需配送费{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay">
                    ￥{{minPrice}}起送
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          deliveryPrice: {
              type: Number,
              default: 0
          },
          minPrice: {
              type: Number,
              default: 0
          }
      },
      data () {
        return {}
      }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    .shopcart
        position fixed
        left 0px
        bottom 0px
        z-index 50
        width 100%
        height 48px
        .content
            display flex
            background #141d27
            font-size 0
            .content-left
                flex 1
                .logo-wrapper
                    display inline-block
                    position relative
                    top -10px
                    margin 0 12px
                    padding 6px
                    width 56px
                    height 56px
                    box-sizing border-box
                    vertical-align top
                    border-radius 50%
                    background #141d27
                    .logo
                        width 100%
                        height 100%
                        border-radius 50%
                        background #2b343c
                        text-align center
                        .icon-shopping_cart
                            line-height 44px
                            font-size 24px
                            color #80858a
                    .num
                        position absolute
                        top 0
                        right 0px
                        width 24px
                        height 16px
                        line-height 16px
                        text-align center
                        border-radius 16px
                        font-size 9px
                        font-weight 700
                        color #fff
                        background red
                        box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
                .price
                    display inline-block
                    font-size 16px
                    font-weight 700
                    vertical-align top
                    line-height 24px
                    margin-top 12px
                    box-sizing border-box
                    padding-right 12px
                    border-right 1px solid rgba(255,255,255,0.1)
                    color #80858a
                .desc
                    display inline-block
                    vertical-align top
                    line-height 24px
                    margin 12px 0 0 12px
                    font-size 10px
                    color rgba(255,255,255,0.4)
            .content-right
                flex 0 0 105px
                width 105px
                .pay
                    line-height 48px
                    text-align center
                    font-size 12px
                    color #80858a
                    font-weight 700
                    background #2b343c
</style>
