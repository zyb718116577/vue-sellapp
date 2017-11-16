<template>
    <div class="shoplist">
        <div class="list-wrapper" @click="closeList">
            <div class="content" @click.stop="stop" >
                <div class="header border-1px">
                    <div class="text">购物车</div>
                    <button :disabled="selectFoods.length == 0?true:false" class="button" @click.stop="clearCartlist">清空</button>
                </div>
                <div class="good-list" v-el:cart-list>
                    <ul>
                        <li class="no-goods" v-show="selectFoods.length==0">
                            <div class="no-goods">暂无商品！</div>
                        </li>
                        <li v-for="food in selectFoods" class="food-item">
                            <div class="name">{{food.name}}</div>
                            <div class="price">￥{{food.price}}</div>
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
  import cartcontrol from '../../components/cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';

  export default {
      props: {
          selectFoods: {
              type: Array
          },
          showShoplist: {
              type: Boolean
          }
      },
      components: {
          cartcontrol
      },
      methods: {
          initScroll() {
              this.listScroll = new BScroll(this.$els.cartList,{
                  click: true
              });
          },
          closeList(event) {
              this.$dispatch('shoplist.close',event);
          },
          // 清空购物车
          clearCartlist() {
              console.log(2)
              this.selectFoods.forEach((item)=>{
                  item.count = 0;
              })
          },
          stop() {
              // 为了避免点击list触发关闭操作
          }
      },
      watch: {
          showShoplist(older) {
              if (older) {
                  this.$nextTick(() => {
                      this.initScroll()
                  })
              }
          }
      },
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
                        flex: 0 0 70px;
                        padding-right: 18px;
                        color: #00a0dc;
                        background: none;
                        border: none;
                .good-list
                    background #fff
                    max-height 265px
                    overflow hidden
                    ul
                        .no-goods
                            height 48px
                            line-height 48px
                            text-align center
                            font-size 14px
                        .food-item
                            display flex
                            padding 0 18px
                            text-align center
                            line-height 48px
                            height 48px
                            border-1px(rgba(7,17,27,0.1))
                            .name
                                flex 1
                                font-size 14px
                                text-align left
                            .price
                                flex 0 0 30px
                                font-size 14px
                                color rgb(240,20,20)
                            .control-wrapper
                                flex 0 0 100px
                                padding-top 5px

</style>
