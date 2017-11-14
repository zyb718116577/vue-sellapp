<template>
    <div class="shoplist">
        <div class="list-wrapper">
            <div class="content">
                <div class="header border-1px">
                    <div class="text">购物车</div>
                    <div class="button">清空</div>
                </div>
                <div class="good-list">
                    <!--<div class="no-goods" v-show="selectFoods.length==0">暂无商品！</div>-->
                    <ul>
                        <li v-for="food in selectFoods" class="food-item">
                            <div class="name">{{food.name}}</div>
                            <div class="price">{{food.price}}</div>
                            <div class="control-wrapper">
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from '../../components/cartcontrol/cartcontrol'

  export default {
      props: {
          selectFoods: {
              type: Array
          }
      },
      data () {
          return {}
      },
      components: {
          cartcontrol
      }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin"
    .shoplist
        width 100%;
        position fixed;
        top 0
        left 0
        bottom 48px
        background rgba(0,0,0,.3)
        z-index 49
        .list-wrapper
            position relative
            height 100%
            .content
                max-height 305px
                position absolute
                bottom 0
                left 0
                width 100%
                .header
                    display flex
                    width 100%
                    height 40px
                    line-height 40px
                    background #f3f5f7
                    font-size 14px
                    color rgb(7,17,27)
                    border-1px(rgba(7,17,27,0.1))
                    .text
                        padding-left 18px
                        flex 1
                    .button
                        flex 0 0 35px
                        padding-right 18px
                        color rgb(0,160,220)

                .good-list
                    background #fff
                    .no-goods
                        height 48px
                        line-height 48px
                        text-align center
                        font-size 14px
                    ul
                        .food-item
                            display flex
                            padding 0 18px
                            text-align center
                            line-height 48px
                            height 48px
                            border-1px(rgba(7,17,27,0.1))
                            .name
                                flex 1
                                text-align left
                            .price
                                flex 0 0 30px
                            .control-wrapper
                                flex 0 0 100px
                                padding-top 5px

</style>
