<template>
    <block>
        <view class="tabbar" :style="{background}" :class="[{fixed:index, 'visibility-hidden relative':!index}]" v-for="(item, index) in [0,1]" :key="index">
            <view class="tabbar-main flex align-items-center justify-content-space-between p-t-20 p-b-20 p-l-40 p-r-60">
                <view class="search">
                    <search disabled />
                </view>
                <view class="all" @click.stop="setIsAll(true)">
                    <image class="icon" :src="`../static/all${isAll?'':'1'}.png`" mode="widthFix"></image>
                </view>
                <view class="in" @click.stop="setIsAll()">
                    <image class="icon" :src="`../static/in${isAll?'1':''}.png`" mode="widthFix"></image>
                </view>
            </view>
            <view class="ipx-holder" v-if="isIPX"></view>
        </view>
    </block>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import {upxToPx} from '@/utils/utils'
export default {
    name: 'tabbar',
    computed: {
        ...mapGetters(['isIPX','isAll'])
    },
    watch:{
        isIPX:{
            handler(n,o){
                let tabbar = upxToPx(100 + (n?68:0));
                this.setTabbar(tabbar)
            },
            immediate:true
        }
    },
    props: {
        background: {
            type: String,
            default: '#6448B5'
        },
        all: {
            type: Boolean,
            default: true,
        },
    },
    methods:{
        ...mapMutations(['setTabbar', 'setIsAll'])
    }
}
</script>
<style lang="scss" scoped>
.tabbar {
    width: 100vw;

    &.fixed {
        left: 0;
        bottom: 0;
        z-index: 100;
    }

    .search {
        width: 380upx;
        height: 60upx;
    }

    .all,
    .in {
        image {
            width: 60upx;
        }
    }
}
</style>