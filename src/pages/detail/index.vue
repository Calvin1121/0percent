<template>
    <view class="detail">
        <navbar />
        <view class="banner relative">
            <view class="indicators bg-999 color-fff font24 absolute" v-if="banner.length">{{current+1}}/{{banner.length}}</view>
            <swiper autoplay circular @change="swiperChange($event, 'current')">
                <swiper-item v-for="(item, index) in banner" :key="index">
                    <image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1618917910,1316838749&fm=26&gp=0.jpg" mode="aspectFill"></image>
                </swiper-item>
            </swiper>
        </view>
        <view class="base-info p-l-20 p-r-20 p-t-20 p-b-20">
            <view class="title share-in flex align-items-center justify-content-space-between">
                <view class="title color-342369 fw-6 font40">c64</view>
                <view class="share-in flex align-items-center">
                    <view class="share flex align-items-center justify-content-center p-r-15 p-t-15 p-b-15" @tap="this.type='share';this.backdrop=true">
                        <image src="../../static/fenxiang@2x.png" mode="widthFix"></image>
                    </view>
                    <view class="in flex align-items-center justify-content-center p-l-15 p-t-15 p-b-15">
                        <image src="../../static/guanzhu@2x.png" mode="widthFix"></image>
                    </view>
                </view>
            </view>
            <view class="desc font28 color-342369">crp keycapscrp keycapscrp keycaps</view>
            <view class="tags flex flex-wrap p-t-20">
                <view class="tag font24 color-6448B5 m-r-20 m-t-20" v-for="(item, index) in tags" :key="index">{{item}}</view>
            </view>
        </view>
        <view class="split bg-f8f8f8"></view>
        <view class="info-detail border">
            <view class="info-main overflow-hidden" :style="{height:`${84*(toggle?5:1)}rpx`,transition:'all .25s'}">
                <view class="row flex align-items-center">
                    <view class="label">品牌</view>
                    <view class="value flex-1 flex align-items-center justify-content-flex-end">
                        <view class="info-tag">hammerworks</view>
                        <view class="info-tag">crp keycaps</view>
                    </view>
                </view>
                <view class="row flex align-items-center">
                    <view class="label">设计</view>
                    <view class="value flex-1 flex align-items-center justify-content-flex-end">
                        <view class="info-tag pink">buger.work</view>
                    </view>
                </view>
                <view class="row flex align-items-center">
                    <view class="label">预计开团时间</view>
                    <view class="value flex-1 text-right">2020-8-31——2020-9-23</view>
                </view>
                <view class="row flex align-items-center">
                    <view class="label">预计发货时间</view>
                    <view class="value flex-1 text-right">2020-9-31——2020-10-23</view>
                </view>
                <view class="row flex align-items-center">
                    <view class="label">开团平台</view>
                    <view class="value flex-1 text-right">淘宝【BUGER.work】</view>
                </view>
            </view>
            <view class="toggle-block flex align-items-center justify-content-center">
                <view class="icon-block p-b-20 p-l-20 p-r-20" :class="{'up':toggle}" @click.stop="this.toggle = !this.toggle">
                    <image class="toggle-icon" src="../../static/toggle.png" mode="widthFix"></image>
                </view>
            </view>
        </view>
        <view class="state-block flex flex-column align-items-center p-t-40 p-l-20 p-r-20">
            <view class="button ic flex color-fff align-items-center justify-content-center m-b-50">IC</view>
            <view class="states">
                <block v-for="(item, index) in [1,2,3]" :key="index">
                    <view class="state m-b-20 flex" @tap="this.type='state';this.backdrop=true">
                        <image class="m-r-15" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1618917910,1316838749&fm=26&gp=0.jpg" mode="aspectFill"></image>
                        <view class="main">
                            <view class="title font36 fw-5 color-342369 bg-f1f1f1 line-clamp-1">开车中</view>
                            <view class="desc m-t-10 font24 color-342369">由YORK设计，0.01代工的原厂二色注塑键帽。</view>
                        </view>
                    </view>
                </block>
            </view>
        </view>
        <view class="ipx-holder" v-if="isIPX"></view>
        <view class="backdrop" :class="{show:backdrop,hide:!backdrop}" @touchmove.stop.prevent @click.stop="this.backdrop = false">
            <view class="state-popup bg-fff" :class="{show:backdrop,hide:!backdrop}" v-if="type=='state'" @click.stop>
                <view class="title-close flex align-items-center">
                    <view class="title flex-1 line-clamp-1 color-342369 font36 fw-5">延期公告</view>
                    <view class="close flex align-items-center justify-content-center" @click.stop="this.backdrop = false">
                        <image src="../../static/guanbi@2x.png" mode="widthFix"></image>
                    </view>
                </view>
                <view class="state-swiper relative m-t-25">
                    <view class="indicators bg-999 color-fff font24 absolute" v-if="banner.length">{{stateIndex+1}}/{{banner.length}}</view>
                    <swiper autoplay circular @change="swiperChange($event, 'stateIndex')">
                        <swiper-item v-for="(item, index) in banner" :key="index">
                            <image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1618917910,1316838749&fm=26&gp=0.jpg" mode="aspectFill"></image>
                        </swiper-item>
                    </swiper>
                </view>
                <view class="date bg-f1f1f1 color-342369 text-center font22 m-t-10">此消息发布于：2020-08-30 07:56</view>
                <view class="text color-342369 font28 m-t-25">
                    由于部分模具问题，【东方】需要重新修改。预计2周后改完测试，交货期顺延至9月24日，感谢理解。
                </view>
            </view>
            <view class="share-actions bg-fff" :class="{show:backdrop,hide:!backdrop}" v-if="type=='share'" @click.stop>
                <view class="actions">
                    <button open-type="share" class="font28 color-342369">分享给好友</button>
                    <button @tap="toPoster" class="font28 color-342369">保存图片</button>
                </view>
                <view class="split bg-f8f8f8"></view>
                <view class="cancel color-342369 font30 fw-6 text-center p-t-25 p-b-25" @tap="this.backdrop = false">取消</view>
                <view class="ipx-holder" v-if="isIPX"></view>
            </view>
        </view>
        <!-- <uni-popup ref="popup" :type="type">
            <view class="state-popup bg-fff">
                <view class="title-close flex align-items-center">
                    <view class="title flex-1 line-clamp-1 color-342369 font36 fw-5">延期公告</view>
                    <view class="close flex align-items-center justify-content-center" @tap="this.$refs.popup.close();">
                        <image src="../../static/guanbi@2x.png" mode="widthFix"></image>
                    </view>
                </view>
                <view class="state-swiper relative m-t-25">
                    <view class="indicators bg-999 color-fff font24 absolute" v-if="banner.length">{{stateIndex+1}}/{{banner.length}}</view>
                    <swiper autoplay circular @change="swiperChange($event, 'stateIndex')">
                        <swiper-item v-for="(item, index) in banner" :key="index">
                            <image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1618917910,1316838749&fm=26&gp=0.jpg" mode="aspectFill"></image>
                        </swiper-item>
                    </swiper>
                </view>
                <view class="date bg-f1f1f1 color-342369 text-center font22 m-t-10">此消息发布于：2020-08-30 07:56</view>
                <view class="text color-342369 font28 m-t-25">
                	由于部分模具问题，【东方】需要重新修改。预计2周后改完测试，交货期顺延至9月24日，感谢理解。
                </view>
            </view>
            <view class="share-actions bg-fff">
            	<view class="actions">
            		<button class="font28 color-342369">分享给好友</button>
            		<button class="font28 color-342369">保存图片</button>
            	</view>
            	<view class="split bg-f8f8f8"></view>
            	<view class="cancel color-342369 font30 fw-6 text-center p-t-25 p-b-25"  @tap="this.$refs.popup.close();">取消</view>
            	<view class="ipx-holder" v-if="isIPX"></view>
            </view>
        </uni-popup> -->
    </view>
</template>
<script>
import { mapGetters } from 'vuex';
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default {
    name: 'detail',
    components: {
        uniPopup
    },
    data() {
        return {
            banner: [1, 2, 3],
            current: 0,
            tags: ['#CRP热升华键帽', '#BBOXG0外壳', '#主题鼠标垫', '#主题树脂个性键帽', '#CA原厂球帽'],
            toggle: true,
            stateIndex: 0,
            type: 'state',
            backdrop: false
        }
    },
    computed: {
        ...mapGetters(['isIPX'])
    },
    onShareAppMessage(){
    	this.backdrop = false;
    	return {
    		title:'c64'
    	}
    },
    methods: {
        swiperChange(e, item) {
            let { current } = e.detail;
            this[item] = current;
        },
        toPoster(){
        	uni.navigateTo({url:'./poster',complete:()=>this.backdrop = false})
        }
    }
}
</script>
<style lang="scss" scoped>
page {
    background: #f8f8f8;
}

swiper {
    width: 100vw;
    height: 500upx;

    image {
        width: 100%;
        height: 100%;
    }
}

.indicators {
    bottom: 20upx;
    right: 20upx;
    border-radius: 20upx;
    padding: 5upx 20upx;
    z-index: 10;
}

.share-in {
    image {
        width: 36upx;
    }
}

.tag {
    background: rgba(189, 174, 235, .2);
    padding: 4upx 20upx;
    border-radius: 4upx;
}

.split {
    height: 20upx;
}

.row {
    padding: 20upx;
    @extend .font28;
    @extend .color-342369;

    .info-tag {
        border-radius: 25upx;
        border: 1upx solid rgba(100, 72, 181, .2);
        font: 24upx;
        padding: 2upx 16upx;
        margin-left: 20upx;

        &.default {
            @extend .color-6448B5;
        }

        &.pink {
            color: #FD3691
        }
    }
}

.border {
    border-bottom: 2upx solid rgba(204, 204, 204, .2);
}

.icon-block {
    transition: all .25s;

    &.up {
        transform: rotate(-180deg);
        transform-origin: center;
    }

    .toggle-icon {
        width: 20upx;
    }
}

.button {
    width: 234upx;
    height: 40upx;
    border-radius: 50upx;

    &.ic {
        background: #FD3691;
        font-size: 36upx;
    }

    &.buy {
        background: #6448B5;
        font-size: 32upx;
    }
}

.state {
    width: calc(100vw - 30upx);
    background: #FFFFFF;
    box-shadow: 0 0 20upx 0 #CCCCCC;
    padding: 15upx;

    image {
        width: 300upx;
        height: 200upx;
        background: #f1f1f1;
    }

    .main {
        width: calc(100% - 315upx);
    }
}

.backdrop {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .4);
    left: 0;
    top: 101vh;
    z-index: 101;
    &.show {
        top: 0;
    }

    &.hide {
        top: 101vh;
    }
}

.state-popup {
    width: 676upx;
    border-radius: 10upx;
    padding: 28upx;
    opacity: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    transform-origin: center;

    &.show {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
        transform-origin: center;
        // transition: all .25s;
    }

    &.hide {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
        transform-origin: center;
        // transition: all .25s;
    }

    .close image {
        width: 48upx;
    }

    swiper {
        width: 100%;
        height: 414upx;
    }
}

.share-actions {
	position: absolute;
    width: 100vw;
    bottom: 0;
    left: 0;
    transform:translateY(100%);
    
    &.show{
    	transform:translateY(0%);
    	// transition: all .25s;
    }
    &.hide{
    	transform:translateY(100%);
    	// transition: all .25s;

    }
    button {
        background: #fff;
        padding: 25upx 0;
        height: auto;
        line-height: unset;

        &:after {
            display: none;
        }
    }
}
</style>