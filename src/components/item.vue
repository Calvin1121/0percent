<template>
    <navigator hover-class="none" :url="`/pages/detail/index?id=${item.id}`" class="item">
        <image :src="banner.img" mode="aspectFill" lazy-load></image>
        <view class="main p-l-20 p-r-20 p-t-15 p-b-30">
            <view class="name-keyword-type p-b-40">
                <view class="name fw-7 color-342369 font32">{{item.goodName}}</view>
                <view class="keyword-type flex justify-content-space-between">
                    <view class="keywords flex-1 color-342369 font28 align-self-flex-end line-clamp-1">{{item.info}}</view>
                    <view :class="[{'bg-6448B5':goodStatus.match(/gb|截团/gi),'bg-FD3691':goodStatus.match(/ic/gi),'visibility-hidden':!goodStatus.match(/ic|gb|截团/gi)}]" class="type flex align-items-center justify-content-center font32 fw-6 color-fff m-l-10">{{goodStatus}}</view>
                </view>
            </view>
            <view class="progress-block p-l-20 p-r-20">
                <dc-slider :blockColor="activeColor" :activeColor="activeColor" :value="percent" disabled />
            </view>
        </view>
    </navigator>
</template>
<script>
import dcSlider from '@/components/dc-slider.vue';
import { dateFormat } from '@/utils/utils'
export default {
    components: { dcSlider },
    name: 'item',
    props: {
        item: {
            type: Object,
            default: {}
        },
        time: {
            type: String,
            default () {
                return dateFormat(null, 'yyyy-MM-dd hh:mm:ss')
            }
        }
    },
    computed: {
        percent() {
            let { time } = this, { openTime, sendTime, goodStatus, goodState } = this.item,
                percent = 0;
            if (!goodStatus.match(/ic/gi) && goodState < 2) {
                if (time) time = new Date(time.replace(/\-/gi, '/')).getTime()
                if (openTime) openTime = new Date(openTime.replace(/\-/gi, '/')).getTime()
                if (sendTime) sendTime = new Date(sendTime.replace(/\-/gi, '/')).getTime()
                percent = (time - openTime) / (sendTime - openTime)
                if (percent <= 0) percent = 0;
                if (percent >= 1) percent = 1;
            }else if(goodState == 3 || goodState == 2){
                percent = 1
            }
            return percent * 100
        },
        activeColor() {
            let { goodStatus, goodState } = this.item;
            return goodState == 3 ? '#f1f1f1' : goodStatus.match(/ic/gi) ? '#FD3691' : '#6448B5'
        },
        banner() {
            let { showImgInfo } = this.item;
            showImgInfo = JSON.parse(showImgInfo)
            return showImgInfo[0] || {}
        },
        goodStatus() {
            let { goodStatus, goodState } = this.item;
            if (!goodStatus) return
            if (goodState == 1) {
                if (goodStatus.match(/gb|ic|截团/gi)) {
                    return goodStatus
                } else {
                    return '1'
                }
            } else if (goodState == 2 || goodState == 3) {
                return '1'
            }

        }
    }
}
</script>
<style lang="scss">
.item {
    width: inherit;
    background: #fff;
    box-shadow: 0px 0px 20upx 0px #CCCCCC;
    border-radius: 10upx 10upx 5upx 5upx;
    overflow: hidden;

    image {
        width: 100%;
        height: 230upx;
        background: #f1f1f1;
    }

    .type {
        border-radius: 50upx;
        padding: 2upx 10upx;
        // height: 40upx;
    }
}
</style>