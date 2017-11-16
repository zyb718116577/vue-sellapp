<template>
    <div class="ratingselect">
        <div class="button-wrapper border-1px">
            <div @click="all" :class="{'active': selectType == 2}"
                 class="button-item all">{{desc.all}}<span>{{ratings.length}}</span></div>
            <div @click="positive" :class="{'active': selectType == 0}"
                 class="button-item positive">{{desc.positive}}<span>{{positiveLength}}</span></div>
            <div @click="nagative" :class="{'active': selectType == 1}"
                 class="button-item nagative">{{desc.nagative}}<span>{{nagativeLength}}</span></div>
        </div>
        <div class="only-content">
            <i @click="contentOnly" :class="{'only': onlyContent}" class="icon-check_circle"></i>只看有内容的评价
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        props: {
            ratings: {
                type: Array,
                default() {
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default() {
                    return {
                        all: '全部',
                        positive: '满意',
                        nagative: '不满意'
                    }
                }
            }
        },
        methods: {
            /*只看有内容的评论*/
            contentOnly() {
                this.onlyContent = !this.onlyContent;
                this.$dispatch('food.select',this.onlyContent);
            },
            /*全部*/
            all() {
                this.selectType = ALL;
                this.$dispatch('food.select',this.selectType);
            },
            /*好评*/
            positive() {
                this.selectType = POSITIVE;
                this.$dispatch('food.select',this.selectType);
            },
            /*差评*/
            nagative() {
                this.selectType = NEGATIVE;
                this.$dispatch('food.select',this.selectType);
            }
        },
        computed: {
            positiveLength() {
                var count = 0;
                this.ratings.forEach((item)=>{
                    if (item.rateType == 0) {
                        count++;
                    }
                })
                return count;
            },
            nagativeLength() {
                var count = 0;
                this.ratings.forEach((item)=>{
                    if (item.rateType == 1) {
                        count++;
                    }
                })
                return count;
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin"
    .button-wrapper
        display flex
        font-size 0
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        .button-item
            font-size 12px
            color rgb(77,85,93)
            line-height 16px
            padding 8px 12px
            margin-right 8px
            border-radius 2px
            span
                display inline-block
                font-size 8px
                vertical-align top
        .all, .positive
            background rgba(0,160,220,0.2)
        .nagative
            background rgba(77,85,93,.2)
        .active
            color #ffffff
            background rgb(0,160,220)
    .only-content
        padding 12px 0
        font-size 12px
        color rgb(147,153,159)
        line-height 24px
        .icon-check_circle
            font-size 24px
            line-height 24px
            vertical-align middle
            margin-right 5px
        .only
            color rgb(0,160,220)
</style>
