<template>
    <view class="search flex align-items-center" :style="{background}" @click.stop="tapSearch">
        <view class="icon-block p-l-30 p-r-30 flex align-items-center justify-content-center">
            <image :src="`../static/sousuo${bottom?'@2x':''}.png`" mode="widthFix" class="icon"></image>
        </view>
        <input type="text" class="color-342369 flex-1" v-model="keywords" 
        placeholder-style="color:#342369" :placeholder="placeholder" :focus="!disabled" :disabled="disabled" />
    </view>
</template>
<script>
export default {
    name: 'search',
    props: {
        background: {
            type: String,
            default: '#342369'
        },
        placeholder: {
            type: String,
            default: ''
        },
        holderClass:{
            type: String,
            default: ''
        },
        bottom: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        }
    },
    data(){
        return {
            keywords:''
        }
    },
    methods: {
        tapSearch(){
            let { disabled } = this;
            if(disabled) uni.navigateTo({url:'/pages/search/index'})
        }
    }
}
</script>
<style lang="scss" scoped>
.search {
    width: inherit;
    border-radius: 50upx;
    height: 60upx;

    .icon {
        width: 30upx;
    }
}
</style>