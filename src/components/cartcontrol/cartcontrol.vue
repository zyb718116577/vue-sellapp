<template>
    <div class="cartcontrol">
        <div @click="decreaseCart" class="cart-decrease"
             v-show="food.count>0" transition="move">
            <span class="inner icon-remove_circle_outline"></span>
        </div>
        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
      props: {
         food: {
             type: Object
         }
      },
      methods: {
          addCart(event) {
              if (!event._constructed){
                  return;
              }
              if (!this.food.count) {
                  // 当给一个组件添加未知的属性时候需要用set方法，vue才会监听到它的变化
                  Vue.set(this.food,'count',1)
                  this.food.count = 1;
              } else {
                  this.food.count++;
              }
          },
          decreaseCart(event) {
              if (!event._constructed){
                  return;
              }
              if (this.food.count > 0) {
                  this.food.count--
              }
          }
      }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    .cartcontrol
        font-size 0
        .cart-decrease,.cart-add
            display inline-block
            padding 6px
            transition all 0.4s linear
            &.move-transition
                opacity 1
                transform translate3d(0,0,0)
            .inner
                display inline-block
                line-height 24px
                font-size 24px
                color rgb(0,160,220)
                transition all 0.4s linear
                transform rotate(0)
            &.move-enter, &.move-leave
                opacity 0
                transform translate3d(24px,0,0)
                .inner
                    transform rotate(180deg)
        .cart-count
            display inline-block
            font-size 10px
            vertical-align top
            width 12px
            padding-top 6px
            line-height 24px
            text-align center
            color rgb(147,153,159)
        .cart-add
            display inline-block
            padding 6px
            line-height 24px
            font-size 24px
            color rgb(0,160,220)

</style>
