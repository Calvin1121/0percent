<template>
    <block>
        <block v-for="(item, index) in [0,1]" :key="index">
            <view class="navbar flex align-items-center" :class="[{'fixed':index, 'visibility-hidden relative':!index}]" :style="{height:`${status+navbar}px`,background, paddingTop:`${status}px`}" v-if="index || (!index && fixed)">
                <view class="back" @click.stop="tapBack">
                    <image src="../static/back.png" mode="widthFix" class="back" v-if="canBack"></image>
                </view>
                <view class="title color-fff flex align-items-center justify-content-center">
                    <view class="titel-text" v-if="title">{{title}}</view>
                    <image src="../static/navabr.png" mode="widthFix" class="logo-icon" v-else></image>
                </view>
                <view class="back"></view>
            </view>
        </block>
    </block>
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
            console.log(this.canBack)
            this.setNavbar(this.navbar)
        },
        tapBack() {
            let { canBack, delta } = this, pages = getCurrentPages();
            if (pages.length == 1 && canBack) uni.reLaunch({ url: '/pages/index/index' })
            if (pages.length > 1 && canBack) uni.navigateBack({ delta })
        },
        ...mapMutations(['setNavbar'])
    }
}
</script>
<style lang="scss" scoped>
.navbar {
    width: 100vw;
    padding-left: 20upx;
    padding-right: 20upx;

    &.fixed {
        left: 0;
        top: 0;
        z-index: 100;
    }

    .back {
        width: 44upx;

        image {
            width: 100%;
        }
    }

    .title {
        flex: 1;

        .logo-icon {
            width: 80upx;
        }
    }
}
</style>