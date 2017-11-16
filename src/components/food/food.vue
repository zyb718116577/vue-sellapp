<template>
    <div class="food" v-show="foodshow" v-el:food-wrapper>
        <div class="content">
            <div class="avatar">
                <img v-lazy="food.image" alt="" width="100%">
            </div>
            <div class="baseinfo border-1px">
                <div class="name">{{food.name}}</div>
                <div class="min-desc">月售{{food.sellCount}}份&nbsp;&nbsp;好评率{{food.rating}}%</div>
                <div class="price">
                    <div class="nowprice">￥{{food.price}}</div>
                    <div class="oldprice" v-show="food.oldPrice">￥{{food.oldPrice}}</div>
                </div>

                <div class="cartcontrol-wrapper" v-show="food.count">
                    <cartcontrol :food="food"></cartcontrol>
                </div>
                <button @click="addBtnEvent" v-show="!food.count || food.count===0"
                        class="add-btn" transition="fade">加入购物车</button>

                <div class="close-detail" @click="hideFood">
                    <i class="icon-arrow_lift"></i>
                </div>
            </div>
            <split></split>
            <div v-show="food.info" class="food-desc border-1px">
                <h2>商品介绍</h2>
                {{food.info}}
            </div>
            <split v-show="food.info"></split>
            <div class="food-ratings">
                <h2>商品评价</h2>
                <ratingselect :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></ratingselect>
            </div>
            <div class="ratings-wrapper">
                <ul class="content">
                    <li v-for="item in showRatings" class="ratings-item" v-show="!item.empty">
                        <div class="top">
                            <div class="time">{{util.getLocalTime(item.rateTime)}}</div>
                            <div class="user">
                                {{item.username}}
                                <img v-lazy="item.avatar" width="12" height="12">
                            </div>

                        </div>
                        <div class="main">
                            <i :class="{'icon-thumb_down': item.rateType==1,'icon-thumb_up': item.rateType==0}"
                               class="icon"></i>
                            <span>{{item.text}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import Vue from 'vue';
    import cartcontrol from '../../components/cartcontrol/cartcontrol';
    import split from '../../components/split/split';
    import ratingselect from '../../components/ratingselect/ratingselect';
    import util from '../../common/js/util'

    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                foodshow: false,
                selectType: ALL,
                onlyContent: false,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    nagative: '吐槽'
                }
            }
        },

        methods: {
            showFood() {
                this.foodshow = true;
                this.selectType = ALL;
                this.onlyContent = false;
                // 初始better scroll
                this.$nextTick(()=>{
                    if (!this.scroll){
                        this.scroll = new BScroll(this.$els.foodWrapper,{
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                })
            },
            hideFood() {
                this.foodshow = !this.foodshow;
            },
            //加入购物车按钮事件
            addBtnEvent(event) {
                if (!event._constructed) {
                    return;
                }
                this.$dispatch('cart.add',event.target,this.food.image);
                Vue.set(this.food, 'count' ,1);
            },
            _changeType(selectType) {
                if(typeof selectType === 'boolean'){
                    this.onlyContent = selectType;
                    return;
                }
                this.selectType = selectType;
            }

        },

        computed: {
            // 获取筛选过后的评论
            showRatings() {
                let result = [];
                if (this.selectType != ALL) {
                    this.food.ratings.forEach((item)=>{
                        if (item.rateType === this.selectType){
                            result.push(item)
                        }
                    })
                } else {
                    result = this.food.ratings;
                }
                if (result) {
                    if (this.onlyContent) {
                        result.forEach((item)=>{
                            if (item.text.length == 0){
                                Vue.set(item,'empty',true);
                            }
                        })
                    } else {
                        result.forEach((item)=>{
                            Vue.set(item,'empty',false);
                        })
                    }
                }
                return result;
            }
        },

        events: {
            'food.select'(selectType) {
                this._changeType(selectType);
            }
        },

        components: {
            cartcontrol,
            split,
            ratingselect
        }
    }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin"

    .food
        position: fixed;
        bottom: 46px;
        top: 0;
        z-index: 49;
        width: 100%;
        background: #ffffff;
        .content
            width 100%
            .baseinfo
                padding 18px
                position relative
                border-1px(rgba(7,17,27,0.1))
                .name
                    font-size 14px
                    font-weight 700
                    color rgb(7,17,27)
                    line-height 14px
                .min-desc
                    margin-top 8px
                    font-size 10px
                    color rgb(147,153,159)
                    line-height 10px
                .price
                    margin-top 18px
                    .nowprice
                        color rgb(240,20,20)
                        font-size 14px
                        line-height 24px
                        display inline-block
                    .oldprice
                        font-size 10px
                        display inline-block
                        color rgb(147,153,159)
                        text-decoration line-through
                .cartcontrol-wrapper
                    position absolute
                    right 12px
                    bottom 12px
                .add-btn
                    position absolute
                    right 18px
                    bottom 18px
                    width 74px
                    height 24px
                    color #ffffff
                    font-size 10px
                    line-height 24px
                    text-align center
                    border none
                    border-radius 12px
                    background rgb(0,160,220)
                    z-index 10
                    padding 0 12px
                    box-sizing border-box
                    &.fade-transition
                        transition all 0.2s
                        opacity 1
                    &.fade-enter, &.fade-leave
                        opacity 0
                .close-detail
                    position fixed
                    left 5px
                    top 5px
                    padding 5px
                    color #ffffff
            .food-desc
                border-1px(rgba(7,17,27,0.1))
                padding 18px
                font-size 12px
                color rgb(77,85,93)
                line-height 24px
                font-weight 200
                h2
                    font-size 14px
                    font-weight 700
                    color rgb(7,17,27)
                    line-height 14px
                    margin-bottom 3px
            .food-ratings
                background #ffffff
                padding 18px
                padding-bottom 0
                h2
                    font-size 14px
                    font-weight 700
                    color rgb(7,17,27)
                    line-height 14px
                    margin-bottom 12px
            .ratings-wrapper
                padding 0 18px
                border-top 1px solid rgba(7,17,27,.1)
                .content
                    list-style none
                    .ratings-item
                        padding 16px 0
                        border-1px(rgba(7,17,27,0.1))
                        .top
                            display flex
                            font-size 10px
                            color rgb(147,153,159)
                            .time
                                flex 0 0 150px
                            .user
                                flex 1
                                text-align right
                                img
                                    border-radius 50%
                        .main
                            margin-top 6px
                            font-size 12px
                            line-height 16px
                            .icon-thumb_down
                                color rgb(147,153,159)
                            .icon-thumb_up
                                color rgb(0,160,220)
</style>
