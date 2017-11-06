<template>
    <div class="title">
        <div class="line"></div>
        <div class="text">{{getTitle}}</div>
        <div class="line"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            title: {
                type: String
            }
        },
        computed: {
            getTitle: function(){
                return this.title
            }

        }
    }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus" scoped>
    .title
        width 80%
        display flex
        margin 30px auto 24px auto
        .line
            flex 1
            position relative
            top -6px
            border-bottom 1px solid rgba(255,255,255,.2)
        .text
            padding 0 12px
            font-size 14px
            font-weight 700
</style>
