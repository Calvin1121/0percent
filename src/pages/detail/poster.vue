<template>
    <view class="flex block flex-column">
        <navbar />
        <view class="poster-block flex-1 flex flex-column align-items-center justify-content-center">
            <view class="poster" :style="{'box-shadow': poster?'0rpx 0rpx 10rpx 4rpx #CCCCCC':''}">
                <canvas id="poster" canvas-id="poster" v-if="!poster"></canvas>
                <image :src="poster" mode="widthFix" @tap="preView" v-else></image>
            </view>
            <view class="save font30 color-fff flex align-items-center justify-content-center m-t-60" v-if="poster" @tap="savePoster">保存图片</view>
        </view>
    </view>
</template>
<script>
import { API_URL } from '@/utils/request'
import { mapGetters, mapMutations } from 'vuex'
import { getQrCode } from '@/utils/api'
export default {
    name: 'poster',
    data() {
        return {
            poster: '',
            title: '',
            code: ''
        }
    },
    watch: {
        shareInfo: {
            handler(n, o) {
                if (n.id) {
                    this.$nextTick(async () => {
                        let { qrCode, id } = this.shareInfo;
                        qrCode = ''
                        if (!qrCode) {
                            let { url } = await getQrCode(n.id);
                            qrCode = url;
                        } else {
                            qrCode = `${API_URL}${qrCode}`
                        }
                        this.code = qrCode;
                        this.draw()
                    })
                }
            },
            deep: true,
            immediate: true
        },
        title(title, o) {
            if (title) {
                this.$nextTick(() => {
                    uni.showToast({
                        title,
                        icon: 'none'
                    })
                    this.title = ''
                })
            }
        }
    },
    computed: {
        ...mapGetters(['shareInfo'])
    },
    onUnload() {
        this.setShareInfo()
    },
    methods: {
        ...mapMutations(['setShareInfo']),
        preView() {
            let current = this.poster;
            uni.previewImage({
                current,
                urls: [current]
            })
        },
        needAuth() {
            return new Promise(resolve => {
                uni.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success: scope => {
                        resolve(true)
                    },
                    fail: async fail => {
                        let res = await this.getAuthByManual();
                        resolve(res)
                    }
                })
            })
        },
        getAuthByManual() {
            return new Promise(resolve => {
                uni.showModal({
                    title: '授权',
                    content: '需要您的授权并保存图片到系统相册',
                    showCancel: false,
                    success: modal => {
                        if (modal.confirm) {
                            uni.openSetting({
                                complete: open_setting => {
                                    resolve(!!open_setting.authSetting['scope.writePhotosAlbum'])
                                }
                            })
                        }
                    }
                })
            })
        },
        async savePoster() {
            let res = await this.needAuth()
            if (res) {
                uni.saveImageToPhotosAlbum({
                    filePath: this.poster,
                    success: success => this.title = '保存成功',
                    fail: fail => this.title = '保存失败'
                })
            }
        },
        getPic(url) {
            return new Promise(resolve => {
                uni.downloadFile({
                    url,
                    success: res => {
                        let { statusCode, tempFilePath } = res;
                        if (statusCode == 200) {
                            resolve(tempFilePath)
                        } else {
                            resolve(null)
                        }
                    }
                });
            })
        },
        async draw() {
            uni.showLoading({ title: '海报生成中' })
            let ctx = uni.createCanvasContext("poster"),
                { shareInfo } = this;
            let img = await this.getPic((shareInfo.showImgInfo[0] || {}).img)
            if (!img) {
                this.title = '海报生成失败'
                return
            }
            ctx.setFillStyle("#ffffff")
            ctx.rect(0, 0, uni.upx2px(664), uni.upx2px(1030))
            ctx.fill()
            ctx.drawImage(img, uni.upx2px(10), uni.upx2px(10), uni.upx2px(644), uni.upx2px(430));
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = "#342369";
            ctx.font = `normal bold ${uni.upx2px(36)}px sans-serif`;
            ctx.fillText(`${shareInfo.goodName}`, uni.upx2px(28), uni.upx2px(510));
            ctx.font = `normal regular ${uni.upx2px(28)}px sans-serif`;
            let strs = this.strToArray(`${shareInfo.info||''}`)
            for (let k = 0; k < strs.length; k++) {
                ctx.fillText(strs[k], uni.upx2px(28), uni.upx2px(575 + k * 40));
            }
            ctx.font = `normal bold ${uni.upx2px(40)}px sans-serif`;
            ctx.fillText('长按识别小程序', uni.upx2px(36), uni.upx2px(860));
            ctx.font = `normal regular ${uni.upx2px(28)}px sans-serif`;
            ctx.fillText('好货要和朋友一起分享', uni.upx2px(40), uni.upx2px(920));
            ctx.beginPath()
            ctx.setStrokeStyle('#cccccc');
            ctx.setLineWidth(uni.upx2px(2));
            ctx.moveTo(uni.upx2px(10), uni.upx2px(720))
            ctx.lineTo(uni.upx2px(654), uni.upx2px(720))
            ctx.setLineDash([2, 4])
            ctx.stroke()
            ctx.beginPath()
            ctx.arc(uni.upx2px(516), uni.upx2px(874), uni.upx2px(96), 0, Math.PI * 2);
            ctx.clip();
            let code = await this.getPic(this.code)
            if (!code) {
                this.title = '海报生成失败'
                return
            }
            ctx.drawImage(code, uni.upx2px(420), uni.upx2px(770), uni.upx2px(192), uni.upx2px(192));
            ctx.draw(true, () => {
                this.$nextTick(() => {
                    uni.canvasToTempFilePath({
                        canvasId: "poster",
                        success: res => {
                            let { tempFilePath } = res;
                            this.poster = tempFilePath || ''
                            uni.hideLoading()
                        },
                        fail: fail => this.title = '海报生成失败'
                    })
                })
            })
        },
        strToArray(str, length = 21) {
            if (str.length < length) {
                let rs = [];
                rs[0] = str;
                return rs || []
            } else {
                let reg = new RegExp(`.{${length}}`, 'gi');
                let rs = str.match(reg);
                console.log()
                rs.push(str.substring(rs.join('').length));
                return rs || []
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.block {
    width: 100vw;
    height: 100vh;
}

.poster {
    display: inline-block;
    width: 664upx;
    height: 1030upx;
    border-radius: 20upx;
    background: #fff;
    overflow: hidden;

    image {
        width: 100%;
    }
}

#poster {
    width: 100%;
    height: 100%;
}

.save {
    width: 426upx;
    height: 60upx;
    background: #6448B5;
    border-radius: 30upx;
}
</style>