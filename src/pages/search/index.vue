<template>
    <view class="search">
        <navbar title="搜索" />
        <view class="search-block p-t-20 p-l-20 p-r-20 p-b-20">
            <search background="#f1f1f1" placeholder="请输入搜索内容" :bottom="false" />
        </view>
        <view class="history p-l-20">
            <view class="title-del flex align-items-center justify-content-space-between">
                <view class="text font30 fw-5 color-342369">历史搜索</view>
                <view class="del-icon p-t-10 p-r-20 p-b-10 p-l-20 flex align-items-center justify-content-center" @click.stop="setHistory()">
                    <image mode="widthFix" src="../../static/qingchu@2x.png"></image>
                </view>
            </view>
            <view class="items flex align-items-center flex-wrap"  v-if="history.length">
                <view class="item color-342369 font28 p-t-5 p-b-5 p-l-15 p-r-15 bg-f1f1f1 m-r-30 m-t-30" v-for="(item, index) in history" :key="index" @tap="tapHisItem(item)">{{item}}</view>
            </view>
        </view>
    </view>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
export default {
    name: 'search',
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['history'])
    },
    methods: {
        ...mapMutations(['setKeyword', 'setHistory']),
        ...mapActions(['actHistory']),
        tapHisItem(keyword) {
            this.setKeyword(keyword)
            this.actHistory(keyword)
            uni.navigateTo({ url: '/pages/search/result' })
        }
    },
    onUnload() {
        this.setKeyword()
    }
}
</script>
<style lang="scss" scoped>
.del-icon {
    image {
        width: 32upx;
    }
}

.item {
    border-radius: 10upx;
}
</style>