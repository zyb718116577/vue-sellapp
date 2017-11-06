<template lang="html">
    <div class="">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" @click="showDetail" class="support-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <div class="detail" v-show="detailShow">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <star :size="48" :score="seller.score"></star>
                    </div>
                    <title :title="titles1"></title>
                    <ul v-if="seller.supports" class="supports">
                         <li class="support-item" v-for="item in seller.supports">
                            <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
                            <span class="text">{{seller.supports[$index].description}}</span>
                         </li>
                    </ul>
                    <title :title="titles2"></title>
                    <div class="bulletin">{{seller.bulletin}}</div>
                </div>
            </div>

            <div class="detail-close" @click="hideDetail">
                <i class="icon-close"></i>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import star from '../../components/star/star'
    import title from '../../components/title/title'

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                detailShow: false,
                titles1: '优惠信息',
                titles2: '商家公告'
            }
        },
        methods: {
            showDetail() {
                this.detailShow = true
            },
            hideDetail() {
                this.detailShow = false
            }
        },
        created() {
            this.classMap = ['decrease','discount','special','invoice','guarantee']
        },
        components: {
            star,
            title
        }
    }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin";

    .header
        color: #fff
        overflow hidden
        position relative
        background-color rgba(7,17,27,0.5)
        .content-wrapper
            position relative
            padding: 24px 12px 18px 24px
            font-size: 0
            .avatar
                display: inline-block
                vertical-align top
                img
                    border-radius 2px
            .content
                display: inline-block
                font-size: 14px
                margin-left: 16px
                .title
                    margin: 2px 0 8px 0
                    .brand
                        width: 30px
                        height: 18px
                        display: inline-block
                        bg-image('brand')
                        background-size: 30px 18px
                        background-repeat: no-repeat
                        vertical-align top
                    .name
                        margin-left: 6px
                        font-size: 16px
                        line-height: 18px
                        font-weight bold
                .description
                    margin-bottom 10px
                    line-height 12px
                    font-size 12px
                .support
                    font-size 0
                    .icon
                        display inline-block
                        width 12px
                        height 12px
                        margin-right 10px
                        background-size 12px 12px
                        background-repeat no-repeat
                        vertical-align top
                        &.decrease
                            bg-image('decrease_1')
                        &.discount
                            bg-image('discount_1')
                        &.guarantee
                            bg-image('discount_1')
                        &.invoice
                            bg-image('invoice_1')
                        &.special
                            bg-image('special_1')
                .text
                    line-height 12px
                    font-size 10px
            .support-count
                position absolute
                right 12px
                bottom 14px
                padding 0 8px
                height 24px
                line-height 24px
                border-radius 14px
                background-color rgba(0,0,0,.2)
                text-align center
                font-size 0
                .count
                    font-size 10px
                .icon-keyboard_arrow_right
                    font-size 10px
                    line-height 24px
                    margin-left 2px

        .bulletin-wrapper
            position relative
            height 28px
            line-height 28px
            padding 0 22px 0 12px
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            background-color rgba(7,17,27,.2)
            .bulletin-title
                display inline-block
                width 22px
                height 12px
                bg-image('bulletin')
                background-size 22px 12px
                background-repeat no-repeat
            .bulletin-text
                margin 0 4px
                font-size 10px
                vertical-align top
            .icon-keyboard_arrow_right
                position absolute
                font-size 10px
                right 12px
                top 8px

        .background
            position absolute
            top 0px
            left 0px
            width 100%
            height 100%
            z-index -1
            filter blur(10px)

        .detail
            position fixed
            z-index 100
            top 0
            left 0
            width 100%
            height 100%
            overflow auto
            background-color rgba(7,17,27,.8)
            .detail-wrapper
                min-height 100%
                width 100%
                .detail-main
                    margin-top 64px
                    padding-bottom 64px
                    .name
                        line-height 16px
                        text-align center
                        font-size 16px
                        font-weight 700
                    .star-wrapper
                        margin-top 18px
                        padding 2px 0px
                        text-align center
                    .supports
                        width 80%
                        margin 0 auto
                        .support-item
                            padding 0 12px
                            margin-bottom 12px
                            font-size 0px
                            &:last-child
                                margin-bottom 0px
                            .icon
                                width 16px
                                height 16px
                                display inline-block
                                vertical-align top
                                margin-right 6px
                                background-size 16px 16px
                                background-repeat no-repeat
                                &.decrease
                                    bg-image('decrease_2')
                                &.discount
                                    bg-image('discount_2')
                                &.guarantee
                                    bg-image('guarantee_2')
                                &.invoice
                                    bg-image('invoice_2')
                                &.special
                                    bg-image('special_2')
                            .text
                                line-height 12px
                                font-size 12px
                    .bulletin
                        width 76%
                        padding 0 12%
                        font-size 12px
                        line-height 30px
            .detail-close
                position relative
                width 32px
                height 32px
                margin -64px auto 0 auto
                font-size 32px
</style>
