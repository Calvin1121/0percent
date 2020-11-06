<template>
    <view class="detail">
        <navbar />
        <block v-if="data.id">
            <view class="banner relative" v-if="banner.length">
                <view class="indicators bg-999 color-fff font24 absolute">{{current+1}}/{{banner.length}}</view>
                <swiper duration="100" circular @change="swiperChange($event, 'current')">
                    <swiper-item v-for="(item, index) in banner" :key="index">
                        <image class="bg-f1f1f1" :src="item.img" mode="aspectFill" @click.stop="preView(item.img)"></image>
                    </swiper-item>
                </swiper>
            </view>
            <view class="base-info p-l-20 p-r-20 p-b-20 overflow-hidden">
                <view class="share-in m-l-20 m-t-20">
                    <view class="icons flex align-items-center flex-column relative">
                        <view class="select-block absolute" v-if="guide"></view>
                        <image :style="{'zIndex':guide?121:0}" :src="`/static/${data.scNum && !guide?'yiguanzhu@2x':'guanzhu@2x'}.png`" mode="widthFix" class="relative" @tap="user.nickName?collectIt():toAuth()"></image>
                        <image src="../../static/fenxiang@2x.png" mode="widthFix" class="m-t-30" @tap="this.type='share';this.backdrop=true"></image>
                    </view>
                </view>
                <view class="title color-342369 fw-7" style="font-size: 106upx">{{data.goodName||''}}</view>
                <view class="desc font32 color-342369 break-all">{{data.info||''}}</view>
                <view class="tags" v-if="data.keyWordNames.length">
                    <view class="tag font24 color-6448B5 m-r-20 m-t-20" v-for="(item, index) in data.keyWordNames" :key="index" @click.stop="filterIt(item, 'keyWordName')">{{`#${item}`}}</view>
                </view>
            </view>
            <view class="split bg-f8f8f8"></view>
            <view class="info-detail border">
                <view class="info-main overflow-hidden" :style="{height:`${70*(toggle?5:0)}rpx`,transition:'all .25s'}">
                    <view class="row flex align-items-center">
                        <view class="label">品牌</view>
                        <view class="value flex-1 flex align-items-center justify-content-flex-end" v-if="data.businessName">
                            <view class="info-tag" @click.stop="filterIt(data.businessName, 'busName')">{{data.businessName}}</view>
                        </view>
                    </view>
                    <view class="row flex align-items-center">
                        <view class="label">设计</view>
                        <view class="value flex-1 flex align-items-center justify-content-flex-end" v-if="data.desNames.length">
                            <block v-for="(item, index) in data.desNames" :key="index">
                                <view class="info-tag pink" @click.stop="filterIt(item, 'designerName')">{{item}}</view>
                            </block>
                        </view>
                    </view>
                    <view class="row flex align-items-center">
                        <view class="label">预计开团时间</view>
                        <view class="value flex-1 text-right">{{data.openTime | dateFormat}}——{{data.closeTime|dateFormat}}</view>
                    </view>
                    <view class="row flex align-items-center">
                        <view class="label">预计发货时间</view>
                        <view class="value flex-1 text-right">{{data.closeTime| dateFormat}}——{{data.sendTime|dateFormat}}</view>
                    </view>
                    <view class="row flex align-items-center">
                        <view class="label">开团平台</view>
                        <view class="value flex-1 text-right">{{data.platformName||''}}</view>
                    </view>
                </view>
                <view class="toggle-block flex align-items-center justify-content-center" @click.stop="this.toggle = !this.toggle">
                    <view class="icon-block p-b-20 p-l-20 p-r-20 p-t-20" :class="{'up':toggle}">
                        <image class="toggle-icon" src="../../static/toggle.png" mode="widthFix"></image>
                    </view>
                </view>
            </view>
            <view class="state-block flex flex-column align-items-center p-t-40 p-l-20 p-r-20">
                <view :class="[{'color-6448B5':goodStatus=='正在制作','color-999':goodStatus.match(/已完成|终止/gi),'color-FD3691':goodStatus.match(/ic/gi),'color-fff bg-6448B5':goodStatus=='购买链接'}]" class="button flex font34 align-items-center justify-content-center m-b-50" @click.stop="handler()" v-if="data.goodStatus">{{goodStatus}}</view>
                <view class="states">
                    <block v-for="(item, index) in progress" :key="index">
                        <view class="state m-b-20 flex" @tap="this.type='state';this.backdrop=true;this.item = item">
                            <block v-for="(item, index) in item.imgInfo" :key="index">
                                <view class="relative" v-if="!index">
                                    <image class="icon absolute" src="/static/play.png" v-if="item.type=='video'"></image>
                                    <image class="m-r-15 bg-f1f1f1" :src="item.url" mode="aspectFill" v-if="item.type=='img'"></image>
                                    <video object-fit="fill" :poster="data.showImgInfo[0].img||''" :show-center-play-btn="false" :controls="false" class="m-r-15" :src="item.url" v-if="item.type=='video'"></video>
                                </view>
                            </block>
                            <view class="main">
                                <view class="title font36 fw-5 color-342369 line-clamp-1" :class="[{'bg-f1f1f1 color-342369':index < progress.length-1,'bg-6448B5 color-27F2C6':index == progress.length-1}]">{{item.speedTitle}}</view>
                                <view class="desc m-t-10 font30 color-342369 line-clamp-2">{{item.speedInfo}}</view>
                            </view>
                        </view>
                    </block>
                </view>
            </view>
            <view class="ipx-holder" v-if="isIPX"></view>
            <view class="backdrop" :class="{show:backdrop,hide:!backdrop}" @touchmove.stop.prevent @click.stop="this.backdrop = false">
                <view class="state-popup bg-fff" :class="{show:backdrop,hide:!backdrop,'visibility-hidden':type=='share' || !type}" @click.stop>
                    <view class="title-close flex align-items-center">
                        <view class="title flex-1 line-clamp-1 color-342369 font36 fw-5">{{item.speedTitle}}</view>
                        <view class="close flex align-items-center justify-content-center" @click.stop="this.backdrop = false">
                            <image src="../../static/guanbi@2x.png" mode="widthFix"></image>
                        </view>
                    </view>
                    <view class="state-swiper relative m-t-25">
                        <image class="icon absolute" src="/static/play.png" @click.stop="playIt(item.stateIndex||0)" v-if="item.imgInfo[item.stateIndex||0].type == 'video' && !item.imgInfo[item.stateIndex||0].is_play"></image>
                        <view class="indicators bg-999 color-fff font24 absolute">{{(item.stateIndex||0)+1}}/{{item.imgInfo.length}}</view>
                        <swiper duration="100" circular @change="swiperChange($event, 'stateIndex', item)">
                            <swiper-item v-for="(v, i) in item.imgInfo" :key="i">
                                <block v-if="v.type == 'img'">
                                    <image class="bg-f1f1f1" :src="v.url" mode="aspectFill"></image>
                                </block>
                                <block v-else>
                                    <video @play="videoFun(i,'play')" @pause="videoFun(i,'pause')" @ended="videoFun(i,'end')" :id="`video${i}`" :show-center-play-btn="false" :controls="false" :src="(item.stateIndex||0)==i?v.url:''" class="video"></video>
                                </block>
                            </swiper-item>
                        </swiper>
                    </view>
                    <view class="date bg-f1f1f1 color-342369 text-center font22 m-t-10">此消息发布于：{{item.createTime}}</view>
                    <view class="text color-342369 font30 m-t-25">
                        {{item.speedInfo}}
                    </view>
                </view>
                <view class="share-actions bg-fff" :class="{show:backdrop,hide:!backdrop,'visibility-hidden':type=='state' || !type}" @touchmove.stop.prevent @click.stop>
                    <view class="actions">
                        <button open-type="share" class="font28 color-342369">分享给好友</button>
                        <button @tap="toPoster" class="font28 color-342369">保存图片</button>
                    </view>
                    <view class="split bg-f8f8f8"></view>
                    <view class="cancel color-342369 font30 fw-6 text-center p-t-25 p-b-25" @tap="this.backdrop = false">取消</view>
                    <view class="ipx-holder" v-if="isIPX"></view>
                </view>
            </view>
            <view class="backdrop guide" :class="{show:guide,hide:!guide}" @touchmove.stop.prevent>
                <image class="plane absolute" src="../../static/plane.png" mode="widthFix" :style="{'top':`${isIPX?840:800}rpx`}"></image>
                <image class="line absolute" src="../../static/line.png" mode="widthFix" :style="{'top':`${isIPX?900:840}rpx`}"></image>
                <view class="guide-text absolute font30 color-fff fw-6" :style="{'top':`${isIPX?995:935}rpx`}">
                    <text decode space="nbsp">点击关注后\n第一时间收到产品更新提醒哦~</text>
                </view>
                <view @click="setGuide(false)" :style="{bottom:`${isIPX?280:150}rpx`}" class="button font30 color-fff absolute flex align-items-center justify-content-center">我知道了</view>
            </view>
            <view class="toast backdrop" :class="{show:toast,hide:!toast}" @touchmove.stop.prevent>
                <view class="toast-block flex align-items-center absolute font40 color-fff">
                    <image :src="`../../static/${!data.scNum?'un':''}follow.png`" mode="widthFix" class="m-r-20"></image>
                    <view>{{!data.scNum?'取消关注':'已关注'}}</view>
                </view>
            </view>
            <!-- <view class="preview backdrop" :class="{show:preview,hide:!preview}" @touchmove.stop.prevent>
               <swiper>
                   <swiper-item class="flex align-items-center jusify-contnet-center" v-for="(item, index) in banner" :key="index">
                       <image :src="item.img" mode="widthFix"></image>
                   </swiper-item>
               </swiper>
            </view> -->
        </block>
    </view>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { getGoods, getProgress, collect } from '@/utils/api'
const filter = {
    pageSize: 15,
    pageNo: 1
}
var timer, toastTimer;
export default {
    name: 'detail',
    data() {
        return {
            lastPage: 0,
            filter: JSON.parse(JSON.stringify(filter)),
            current: 0,
            toggle: true,
            type: '',
            backdrop: false,
            op: {},
            data: {},
            progress: [],
            item: {},
            collectFlag: false,
            callFlag: false,
            toast: false,
            preview: false
        }
    },
    computed: {
        ...mapGetters(['isIPX', 'user', 'shareInfo', 'guide']),
        goodStatus() {
            let { goodStatus, goodState } = this.data;
            if (!goodStatus) return
            if (goodState == 1) {
                if (goodStatus.match(/gb/gi)) {
                    return '购买链接'
                } else if (goodStatus.match(/截团/gi)) {
                    return '正在制作'
                } else if (goodStatus.match(/已发货/gi)) {
                    return '已完成'
                } else {
                    return goodStatus
                }
            } else if (goodState == 2) {
                return '已完成'
            } else if (goodState == 3) {
                return '终止'
            }
        },
        banner() {
            let { imgInfo, showImgInfo } = this.data;
            return [...(imgInfo || []), ...(showImgInfo || [])]
            // return  [...(imgInfo || [])]
        }
    },
    watch: {
        backdrop(n, o) {
            if (!n) {
                this.item = {}
                this.type = ''
            }
        },
        filter(n) {
            this.getProgress()
        },
        async shareInfo(n, o) {
            let { data } = this;
            if (!n.id && !data.qrCode) {
                await this.getGoods()
                await this.getProgress()
            }
        }
    },
    onShareAppMessage() {
        this.backdrop = false
        return {
            title: this.data.goodName
        }
    },
    async onLoad(op) {
        this.op = op
        await this.getGoods()
        await this.getProgress()
    },
    onUnload() {
        this.hasChanged()
        clearTimeout(timer)
    },
    onHide() {
        clearTimeout(timer)
    },
    onReatchBottom() {
        let { filter, lastPage } = this;
        if (filter.pageNo < lastPage) filter.pageNo += 1
    },
    methods: {
        ...mapMutations(['setShareInfo', 'setCollectFlag', 'setKeyword', 'setGuide']),
        preView(current) {
            // this.preview = true
            // let { banner } = this;
            uni.previewImage({
                current,
                urls: this.banner.map(v => v.img)
            })
        },
        getGoods() {
            let { op } = this, { userNo } = this.user;
            return new Promise(resolve => {
                getGoods({ id: op.id || op.scene, userNo }).then(res => {
                    res = res || {};
                    for (let k in res)
                        if (k.match(/imgInfo/gi))
                            res[k] = JSON.parse(res[k] || '[]')
                    // res.imgInfo = [...(res.imgInfo || []), ...(res.showImgInfo || [])]
                    this.data = res;
                    this.collectFlag = this.data.scNum
                    resolve(true)
                })
            })
        },
        getProgress() {
            let { op, filter } = this, { userNo } = this.user;
            return new Promise(resolve => {
                getProgress({ goodId: op.id || op.scene, userNo, ...filter }).then(res => {
                    let { list, lastPage } = res
                    this.lastPage = lastPage || 1
                    list = list || [];
                    for (let k of list) {
                        if (k.imgInfo) k.imgInfo = JSON.parse(k.imgInfo || '[]')
                    }
                    this.progress = [...this.progress, ...list]
                    resolve(true)
                })
            })
        },
        swiperChange(e, flag, item) {
            let { current } = e.detail;
            if (item) {
                item[flag] = current
            } else {
                this[flag] = current;
            }
            this.$forceUpdate()
        },
        toPoster() {
            this.setShareInfo(this.data)
            uni.navigateTo({ url: './poster', complete: () => this.backdrop = false })
        },
        collectIt() {
            let { userNo } = this.user, { scNum, id } = this.data, { guide } = this;
            if (guide) return
            if (scNum) {
                this.collectFun(userNo, id, scNum);
                return
            }
            uni.getSetting({
                withSubscriptions: true,
                success: setting => {
                    if (setting.subscriptionsSetting.mainSwitch) {
                        uni.requestSubscribeMessage({
                            tmplIds: ['m2UtBYIjLc-W79yr9P1FCAJrHqOo9h7ah6RNO5cuImA', '7osSWuu1w3wuT3I06mFtr0d9azAmxUlKvzHSlxDNd2o', 'jAlc7YpsNUSYLYkqRXFgoWSFHJWQeTsqiilHjBfv0VE'],
                            success: res => {
                                if (res['m2UtBYIjLc-W79yr9P1FCAJrHqOo9h7ah6RNO5cuImA'] == 'reject') {
                                    uni.showToast({
                                        title: '您已取消授权',
                                        icon: 'none'
                                    })
                                    return
                                }
                                this.collectFun(userNo, id, scNum)
                            }
                        })
                    } else {
                        uni.showModal({
                            title: '授权',
                            content: '需要您的授权并订阅活动提醒',
                            showCancel: false,
                            success: modal => {
                                if (modal.confirm) {
                                    uni.openSetting()
                                }
                            }
                        })
                    }
                }
            })
        },
        collectFun(userNo, goodId, scNum) {
            let { callFlag } = this;
            if (callFlag) return
            this.callFlag = true
            clearTimeout(toastTimer)
            collect({ userNo, goodId }, !scNum).then(res => {
                this.callFlag = false
                let { code } = res;
                if (code == 200) {
                    this.data.scNum = !scNum ? 1 : 0;
                    this.toast = true
                    toastTimer = setTimeout(() => {
                        this.toast = false
                    }, 2000)
                    // uni.showToast({
                    //     title: `${scNum?'取消收藏':'收藏成功'}`,
                    //     image: '../../static/all.png',
                    //     mask: true
                    // })
                }
            })
        },
        hasChanged() {
            let { collectFlag } = this, { scNum } = this.data;
            if (collectFlag != scNum) {
                this.setCollectFlag(true)
            }
        },
        playIt(index) {
            this.$nextTick(() => {
                let video = uni.createVideoContext(`video${index}`)
                video.play()
            })
        },
        videoFun(index, flag) {
            this.$nextTick(() => {
                let { item } = this;
                try {
                    item.imgInfo[index].is_play = !!(flag == 'play')
                    this.$forceUpdate()
                } catch (error) {
                    // do nothing
                }
            })
        },
        handler() {
            let { goodStatus, buyUrl } = this.data;
            if (goodStatus.match(/gb/gi) && buyUrl)
                uni.showModal({
                    content: `购买链接${buyUrl}`,
                    showCancel: false,
                    confirmText: '立即复制',
                    success: res => {
                        if (res.confirm) {
                            uni.setClipboardData({
                                data: buyUrl,
                            })
                        }
                    }
                })

        },
        filterIt(keyword, flag) {
            this.$nextTick(() => {
                uni.navigateTo({ url: `/pages/search/result?${flag}=${keyword}` })
            })
        },
        toAuth() {
            uni.showToast({
                title: '请先授权登录',
                icon: 'none',
                mask: true
            })
            timer = setTimeout(() => uni.navigateTo({ url: '/pages/login/index' }), 2000)
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
    float: right;
    clear: both;

    .select-block {
        width: 206upx;
        height: 152upx;
        border-radius: 50%;
        background: #fff;
        z-index: 111;
        top: -16upx;
    }

    image {
        width: 118upx;
    }

    .is-guide {
        width: 90upx;
        height: 100%;
        border-radius: 50%;
        background: #fff;
        z-index: 111;
        right: -17upx
    }
}

.tag {
    background: rgba(189, 174, 235, .2);
    padding: 4upx 20upx;
    border-radius: 4upx;
    display: inline-block;
}

.split {
    height: 20upx;
}

.row {
    padding: 15upx 20upx;
    @extend .font28;
    @extend .color-342369;

    .info-tag {
        border-radius: 25upx;
        border: 1upx solid rgba(100, 72, 181, .2);
        font-size: 24upx;
        padding: 4upx 16upx;
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
    transform-origin: center;

    &.up {
        transform-origin: center;
        transform: rotate(-180deg);
    }

    .toggle-icon {
        width: 20upx;
    }
}

.button {
    width: 234upx;
    height: 56upx;
    border-radius: 50upx;
}

.state {
    width: calc(100vw - 30upx);
    background: #FFFFFF;
    box-shadow: 0 0 20upx 0 #CCCCCC;
    padding: 15upx;

    image,
    video {
        width: 300upx;
        height: 200upx;
        background: #f1f1f1;
        vertical-align: middle;
    }

    .icon {
        width: 96upx;
        height: 96upx;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        background: transparent;
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
    top: 0;
    z-index: 101;
    transform: translateY(100%);

    &.toast {
        background: rgba(0, 0, 0, 0);

        .toast-block {
            padding: 20upx 56upx;
            border-radius: 20upx;
            background: rgba(0, 0, 0, .5);
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

            image {
                width: 80upx;
            }
        }
    }

    &.guide {

        .plane {
            width: 65upx;
            // top: 780upx;
            right: 135upx;
        }

        .line {
            width: 102upx;
            top: 840upx;
            right: 190upx;
        }

        .guide-text {
            right: 100upx;
            top: 935upx;
        }

        .button {
            width: 284upx;
            height: 60upx;
            border-radius: 34upx;
            border: 2upx solid #FFFFFF;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    // &.preview{
    //     swiper{
    //         width: 100vw;
    //         height: 100vh;
    //         image{
    //             width: 100%;
    //         }
    //     }
    // }

    &.show {
        transform: translateY(0%);
    }

    &.hide {
        transform: translateY(100%);
        transition-delay: .15s;
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
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
    transform-origin: center;

    &.show {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
        transform-origin: center;
        transition: all .25s;
    }

    &.hide {
        opacity: 0;
        // transform: translate(-50%, -50%) scale(0);
        // transform-origin: center;
        transition: all .25s;
    }

    .close image {
        width: 48upx;
    }

    .state-swiper {
        swiper {
            width: 100%;
            height: 414upx;

            .video {
                width: 100%;
                height: 100%;
                vertical-align: middle;
            }


        }

        .icon {
            width: 96upx;
            height: 96upx;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
            background: transparent;
        }
    }

}

.share-actions {
    position: absolute;
    width: 100vw;
    bottom: 0;
    left: 0;

    &.show {
        transform: translateY(0%);
        transition: all .2s;
    }

    &.hide {
        transform: translateY(120%);
        transition: all .2s;
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