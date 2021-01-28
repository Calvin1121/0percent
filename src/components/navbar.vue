<template>
    <view @touchmove.stop.prevent>
        <block v-for="(item, index) in [0,1]" :key="index">
            <view class="navbar flex align-items-center" :class="[{'fixed':index, 'relative':!index}]" :style="{height:`${status+navbar}px`,background:!index?'':background, paddingTop:`${status}px`}" v-if="index || (!index && fixed)">
                <view class="back flex align-items-center p-l-20" :style="{width:`${navbar}px`,height:`${navbar}px`}" :class="[{'visibility-hidden' :!index}]" @click.stop="tapBack">
                    <image src="../static/back.png" mode="widthFix" class="back" v-if="canBack"></image>
                </view>
                <view :class="[{'visibility-hidden' :!index}]" class="title color-fff flex align-items-center justify-content-center">
                    <view class="titel-text" v-if="title">{{title}}</view>
                    <image src="../static/navabr.png" mode="widthFix" class="logo-icon" v-else></image>
                </view>
                <view :class="[{'visibility-hidden' :!index}]" class="back flex align-items-center p-r-20" :style="{width:`${navbar}px`,height:`${navbar}px`}"></view>
                <view class="fresh absolute flex align-items-center justify-content-center" v-if="!index && fresh">
                    <button class="loading" loading></button>
                    <view class="color-999 font24 m-l-10">正在刷新</view>
                </view>
            </view>
        </block>
    </view>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    name: 'navbar',
    data() {
        return {
            canBack: false,
            status: 0,
            navbar: 0
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        fixed: {
            type: Boolean,
            default: true
        },
        background: {
            type: String,
            default: '#6448B5'
        },
        delta: {
            type: Number,
            default: 1
        },
        fresh: {
            type: Boolean,
            default: false
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            let { statusBarHeight, system } = uni.getSystemInfoSync(), pages = getCurrentPages();
            this.status = statusBarHeight;
            this.navbar = system.match(/ios/gi) ? 44 : 48;
            this.canBack = !(pages[pages.length - 1] || {}).route.match(/pages\/index\/index/gi);
            this.setNavbar(this.navbar + statusBarHeight)
        },
        tapBack() {
            this.$nextTick(() => {
                let { canBack, delta } = this, pages = getCurrentPages();
                if (pages.length == 1 && canBack) uni.reLaunch({ url: '/pages/index/index' })
                if (pages.length > 1 && canBack) uni.navigateBack({ delta })
            })
        },
        ...mapMutations(['setNavbar'])
    }
}
</script>
<style lang="scss" scoped>
.navbar {
    width: 100vw;
    // padding-left: 20upx;
    // padding-right: 20upx;

    &.fixed {
        left: 0;
        top: 0;
        z-index: 100;
    }

    .back {

        image {
            width: 44upx;
        }
    }

    .title {
        flex: 1;

        .logo-icon {
            width: 80upx;
        }
    }

    .fresh {
        left: 50%;
        bottom: 0upx;
        transform: translateX(-50%);
        z-index: 2;

        .loading {
            background: transparent;
            width: auto;
            height: auto;
            line-height: unset;
            padding: 0;
            margin: 0;
            transform: scale(1.3) translateY(-5upx);

            &:after {
                display: none;

            }
        }
    }

}
</style>