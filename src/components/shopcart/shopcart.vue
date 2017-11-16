<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper" @click="toggleShoplist">
                    <div class="logo" :class="{'highlight': totalCount > 0}">
                        <i :class="{'highlight': totalCount > 0}" class="icon-shopping_cart"></i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight': totalCount > 0}">{{totalPrice}}元</div>
                <div class="desc">另需配送费{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <div class="ball-container">
            <div transition="drop" v-for="ball in balls" v-show="ball.show" class="ball">
                <div class="inner inner-hook"></div>
            </div>
        </div>
        <shoplist :select-foods="selectFoods" :show-shoplist="showShoplist" v-show="showShoplist"></shoplist>
    </div>
</template>

<script type="text/ecmascript-6">
    import shoplist from '../../components/shoplist/shoplist'
    export default {
        props: {
            selectFoods: {
                type: Array
            },
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
            return {
                balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}, {show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
                dropBalls: [],
                showShoplist: false
            }
        },
        computed: {
            // 获取总价
            totalPrice () {
                let total = 0
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count
                })
                return total
            },
            // 总数量
            totalCount () {
                let count = 0
                this.selectFoods.forEach((food) => {
                    count += food.count
                })
                return count
            },
            payDesc () {
                if (this.totalPrice === 0) {
                    return `￥${this.minPrice}起送`
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice
                    return `还差￥${diff}元起送`
                } else {
                    return `去结算`
                }
            },
            payClass () {
                if (this.totalPrice < this.minPrice) {
                    return `not-enough`
                } else {
                    return `enough`
                }
            }
        },
        methods: {
            drop(el,image) {
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i]
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        ball.image = image;
                        this.dropBalls.push(ball);
                        return
                    }
                }
            },
            toggleShoplist(event) {
                this.showShoplist = !this.showShoplist;
            }
        },
        transitions: {
            drop: {
                beforeEnter (el) {
                    let count = this.balls.length
                    while (count--) {
                        let ball = this.balls[count];
                        if (ball.show) {
                            let rect = ball.el.getBoundingClientRect();
                            let x = rect.left - 32;
                            let y = -(window.innerHeight - rect.top - 22);
                            el.style.display = '';
                            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                            el.style.transform = `translate3d(0,${y}px,0)`;
                            let inner = el.getElementsByClassName('inner-hook')[0];
                            inner.style.backgroundImage = `url("${ball.image}")`
                            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                            inner.style.transform = `translate3d(${x}px,0,0)`;
                        }
                    }
                },
                enter (el) {
                    let rf = el.offsetHeight
                    this.$nextTick(() => {
                        el.style.webkitTransform = 'translate3d(0,0,0)';
                        el.style.transform = 'translate3d(0,0,0)';
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = 'translate3d(0,0,0)';
                        inner.style.transform = 'translate3d(0,0,0)';
                    })
                },
                afterEnter (el) {
                    let ball = this.dropBalls.shift();
                    if (ball) {
                        ball.show = false;
                        el.style.display = 'none';
                    }
                }
            }
        },
        components: {
            shoplist
        },
        // 事件监听 接收子组件的方法
        events: {
            'shoplist.close'(event) {
                this.toggleShoplist(event);
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped="">
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
                    z-index 55
                    .logo
                        width 100%
                        height 100%
                        border-radius 50%
                        background #2b343c
                        text-align center
                        &.highlight
                            background rgb(0, 160, 220)
                        .icon-shopping_cart
                            line-height 44px
                            font-size 24px
                            color #80858a
                            &.highlight
                                color #fff
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
                        box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                .price
                    display inline-block
                    font-size 16px
                    font-weight 700
                    vertical-align top
                    line-height 24px
                    margin-top 12px
                    box-sizing border-box
                    padding-right 12px
                    border-right 1px solid rgba(255, 255, 255, 0.1)
                    color #80858a
                    &.highlight
                        color #fff
                .desc
                    display inline-block
                    vertical-align top
                    line-height 24px
                    margin 12px 0 0 12px
                    font-size 10px
                    color rgba(255, 255, 255, 0.4)
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
                    &.not-enough
                        background #2b343c
                    &.enough
                        background #00b43c
                        color #fff
        .ball-container
            .ball
                position fixed
                left 32px
                bottom 22px
                z-index 39
                &.drop-transition
                    transition all 0.9s cubic-bezier(0.49, -0.29, .75, .41)
                    .inner
                        width 20px
                        height 20px
                        border-radius 50%
                        background-size contain;
                        transition all 0.9s
</style>
