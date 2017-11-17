<template>
    <div class="ratings" v-el:ratings-wrapper>
        <div class="content">
            <div class="seller-info">
                <div class="left">
                    <h1 class="score">{{seller.score}}</h1>
                    <p>综合评分</p>
                    <div class="min-desc">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="right">
                    <div class="item">
                        <span>服务态度</span>
                        <div class="wrapper">
                            <star :size="36" :score="seller.serviceScore"></star>
                        </div>
                        <div class="score">{{seller.serviceScore}}</div>
                    </div>
                    <div class="item">
                        <span>菜品评价</span>
                        <div class="wrapper">
                            <star :size="36" :score="seller.foodScore"></star>
                        </div>
                        <div class="score">{{seller.foodScore}}</div>
                    </div>
                    <div class="item">
                        <span>送达时间</span>
                        <div class="time">
                            {{seller.deliveryTime}}分钟
                        </div>
                    </div>
                </div>
            </div>
            <split></split>
            <div class="main">
                <ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
                <div class="ratings-wrapper">
                    <ul class="content">
                        <li v-for="item in ratings" class="ratings-item" v-show="_beShow(item.rateType,item.text)">
                            <div class="top">
                                <div class="user">
                                    <img v-lazy="item.avatar" width="28" height="28">
                                </div>
                                <div class="extend">
                                    <p class="userName">{{item.username}}</p>
                                    <p class="desc">
                                        <star :size="24" :score="item.score"></star>
                                        <span v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
                                    </p>
                                </div>
                                <div class="time">{{util.getLocalTime(item.rateTime)}}</div>
                            </div>
                            <div class="main">
                                <span>{{item.text}}</span>
                            </div>
                            <div class="bottpm">
                                <i :class="{'icon-thumb_down': item.rateType==1,'icon-thumb_up': item.rateType==0}"
                                   class="icon"></i>
                                <div class="recommend-item" v-for="(items,indexs) in item.recommend">{{indexs}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import split from '../../components/split/split';
    import ratingselect from '../../components/ratingselect/ratingselect';
    import star from '../../components/star/star';
    import util from '../../common/js/util';
    import BScroll from 'better-scroll';

    const ALL = 2;
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                ratings: [],
                selectType: ALL,
                onlyContent: false
            }
        },
        created() {
            this.$http.get('/api/ratings').then( (response) => {
                if (response.body.errno === util.ERR_OK) {
                    this.ratings = response.body.data;
                    this.$nextTick(()=>{
                        if (!this.scroll){
                            this.scroll = new BScroll(this.$els.ratingsWrapper,{
                                click: true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                    })
                }
            });
        },
        methods: {
            _changeType(selectType) {
                if(typeof selectType === 'boolean'){
                    this.onlyContent = selectType;
                    return;
                }
                this.selectType = selectType;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            _beShow(type,text) {
                // 只看有内容且文字为空
                if (this.onlyContent && !text){
                    return false;
                }
                // 全部
                if (this.selectType == ALL) {
                    return true;
                } else {
                    // type相同则返回true
                    return type === this.selectType;
                }
            }
        },
        components: {
            split,
            ratingselect,
            star
        },
        events: {
            'food.select'(selectType) {
                this._changeType(selectType);
            }
        },
    }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped="">
    @import "../../common/stylus/mixin"
    .ratings
        width 100%
        bottom 0
        position fixed
        top 174px
        overflow hidden
        .content
            width 100%
            background #ffffff
            .seller-info
                display flex
                padding 18px 18px 18px 24px
                .left
                    border-right 1px solid rgba(7,17,27,0.1)
                    text-align center
                    padding-right 18px
                    .score
                        font-size 24px
                        color rgb(255,153,0)
                    p
                        font-size 12px
                        color rgb(7,17,27)
                        line-height 12px
                        margin-top 6px
                    .min-desc
                        font-size 10px
                        color rgb(147,153,159)
                        margin-top 6px
                .right
                    padding-left 18px
                    .item
                        margin-bottom 8px
                        font-size 12px
                        display flex
                        span
                            margin-right 12px
                        .score
                            margin-left 12px
                            margin-top 2px
                            color rgb(255,153,0)
                        .time
                            color rgb(147,153,159)
                        &:last-child
                            margin-bottom 0


            .main
                padding 18px
                .ratings-wrapper
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
                                    flex 1
                                    text-align right
                                .user
                                    flex 0 0 28px
                                    img
                                        border-radius 50%
                                .extend
                                    font-size 10px
                                    margin-left 12px
                                    .userName
                                        color rgb(7,17,27)
                                        margin-bottom 6px
                                    .desc
                                        display flex
                                        span
                                            margin-left 6px
                                            font-size 10px
                                            color rgb(147,153,159)
                            .main
                                margin-top 6px
                                margin-left 22px
                                font-size 12px
                                line-height 16px
                                .icon-thumb_down
                                    color rgb(147,153,159)
                                .icon-thumb_up
                                    color rgb(0,160,220)
                            .bottpm
                                margin-top 6px
                                font-size 12px
                                line-height 16px
                                margin-left 40px
                                display flex
                                flex-wrap wrap
                                .icon
                                    padding-top: 3px;
                                .icon-thumb_down
                                    color rgb(147,153,159)
                                .icon-thumb_up
                                    color rgb(0,160,220)
                                .recommend-item
                                    margin-left 8px
                                    font-size 9px
                                    color rgb(147,153,159)
                                    padding 5px 6px
                                    border 1px solid rgba(7,17,27,.1)
                                    max-width 66px
                                    box-sizing border-box
                                    overflow hidden
                                    text-overflow ellipsis
                                    white-space nowrap
</style>
