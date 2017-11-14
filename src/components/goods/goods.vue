<template lang="html">
    <div class="goods">
        <div class="menu-wrapper" v-el:menu-wrapper>
            <ul>
                <li v-for="item in goods" class="menu-item" :class="{'current': currentIndex === $index}" @click="selectMenu($index,$event)">
                    <span class="text border-1px">
                        <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" v-el:foods-wrapper>
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item border-1px">
                            <div class="icon"><img v-lazy="food.icon" width="57" height="57"></div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart v-ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>

</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import shopcart from '../../components/shopcart/shopcart';
    import cartcontrol from '../../components/cartcontrol/cartcontrol';

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0
            }
        },

        created() {
            this.classMap = ['decrease','discount','special','invoice','guarantee'];

            this.$http.get('/api/goods').then((response)=>{
                response = response.body;
                if (response.errno === this.util.ERR_OK) {
                    this.goods = response.data;
                    // $nextTick作用：等vue节点渲染完成过后再执行内部回调函数
                    this.$nextTick(()=>{
                        // 执行滚动函数
                        this._initScroll();
                        // 计算高度
                        this._calculatHeight();
                    })
                }
            });
        },

        methods: {
            /**点击左侧菜单右侧调转
             * index: 调转节点的索引
             * index： 事件event对象
             * */
            selectMenu(index,event) {
                // 在PC端会触发两次点击事件
                // 解决办法：通过BS内部派发的点击事件的event._constructed为真 而原生为false来过滤
                if (!event._constructed) {
                    return;
                }
                // 拿到右侧调转菜单的dom结合
                let goodsList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
                // 拿到要调转到的dom节点
                let target = goodsList[index];
                // 通过BS的内部方法进行调转
                this.foodsScroll.scrollToElement(target, 300);1
            },

            /*滚动的函数*/
            _initScroll() {
                this.menuScroll = new BScroll(this.$els.menuWrapper,{
                    click: true
                });
                this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
                    //探针作用，实时监测滚动位置
                    probeType: 3,
                    // 加入购物车按钮
                    click: true
                });
                //设置监听滚动位置
                this.foodsScroll.on('scroll', (pos) => {
                    //scrollY接收变量
                    this.scrollY = Math.abs(Math.round(pos.y));
                })
            },
            /*计算高度*/
            _calculatHeight() {
                let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i< foodList.length; i++){
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },

            /*小球动画函数*/
            _drop(target,image) {
                // 访问子组件的方法,并将target传给子组件
                this.$refs.shopcart.drop(target,image);
            }
        },

        computed: {
            /*获取当前滚动高度对应左侧菜单的index*/
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++){
                    let currentHeight = this.listHeight[i],
                        nextHeight = this.listHeight[i+1];
                    if (!nextHeight ||(this.scrollY >= currentHeight && this.scrollY < nextHeight)){
                        return i;
                    }
                }
                return 0;
            },
            /*拿到被选到的food*/
            selectFoods() {
                let foods = [];
                this.goods.forEach((good)=>{
                    good.foods.forEach((food)=>{
                        if (food.count) {
                            foods.push(food);
                        }
                    })
                });
                return foods;
            }
        },

        components: {
            shopcart,
            cartcontrol
        },
        // 事件监听 接收子组件的方法
        events: {
            'cart.add'(target,image) {
                this._drop(target,image);
            }
        }
    };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin"

    .goods
        display flex
        overflow hidden
        bottom 46px
        position absolute
        width 100%
        top 174px
        .menu-wrapper
            flex 0 0 80px
            width 80px
            background #f3f5f7
            .current
                color rgb(0,0,0)
                background #fff
                .text
                    font-weight 700
                    border-none()
            .menu-item
                display table
                height 54px
                width 56px
                line-height 14px
                padding 0 12px
                .icon
                    display inline-block
                    width 12px
                    height 12px
                    margin-right 2px
                    background-size 12px 12px
                    background-repeat no-repeat
                    vertical-align top
                    &.decrease
                        bg-image('decrease_3')
                    &.discount
                        bg-image('discount_3')
                    &.guarantee
                        bg-image('discount_3')
                    &.invoice
                        bg-image('invoice_3')
                    &.special
                        bg-image('special_3')
                .text
                    font-size 12px
                    display table-cell
                    width 56px
                    vertical-align middle
                    border-1px(rgba(7,17,27,0.1))
        .foods-wrapper
            flex 1
            .title
                padding-left 14px
                height 26px
                line-height 26px
                border-left 2px solid #d9dde1
                font-size 12px
                color rgb(147,153,159)
                background #f3f5f7
            .food-item
                display flex
                margin 18px
                padding-bottom 18px
                border-1px(rgba(7,17,27,0.1))
                &:last-child
                    border-none()
                    margin-bottom 0
                .icon
                    flex 0 0 57px
                    margin-right 10px
                .content
                    flex 1
                    .name
                        font-size 14px
                        margin 2px 0 8px 0px
                        height 14px
                        line-height 14px
                        color rgb(7,17,27)
                    .desc
                        margin-bottom 8px
                        line-height 10px
                        font-size 10px
                        color rgb(147,153,159)
                    .extra
                        line-height 10px
                        font-size 10px
                        color rgb(147,153,159)
                        .count
                            margin-right 8px
                    .price
                        font-weight 700
                        line-height 24px
                        .now
                            font-size 14px
                            margin-right 8px
                            color rgb(240,20,20)
                        .old
                            text-decoration line-through
                            font-size 10px
                            color rgb(147,153,159)
                    .cartcontrol-wrapper
                        position absolute
                        right 0
                        bottom 12px


</style>
