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
            <div v-if="seller.supports" class="support-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper"></div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        seller: {
            type: Object
        }
    },
    created() {
        this.classMap = ['decrease','discount','special','invoice','guarantee',]
    }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin";

    .header
        color: #fff
        background: #999
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

</style>
