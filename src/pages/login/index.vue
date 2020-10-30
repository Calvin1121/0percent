<template>
    <view class="login bg-6448B5 flex align-items-center flex-column justify-content-center">
        <navbar />
        <image class="logo" mode="widthFix" src="../../static/logo@2x.png"></image>
        <view class="btn-block relative">
            <image class="btn-bg" src="../../static/kuang@2x.png" mode="widthFix"></image>
            <button :disabled="disabled" class="btn absolute flex align-items-center justify-content-center" open-type="getUserInfo" @getuserinfo="loginFun">微信授权登录</button>
        </view>
    </view>
</template>
<script>
import { getToken } from '@/utils/request'
import { updateUser } from '@/utils/api'
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'detail',
    computed: {
        ...mapGetters(['user'])
    },
    data() {
        return {
            disabled: false
        }
    },
    methods: {
        ...mapMutations(['setToken', 'setUser']),
        loginFun(e) {
            let { userInfo } = e.detail;
            if (!userInfo) {
                uni.showToast({
                    title: '授权失败,请重新授权',
                    icon: 'none'
                })
            } else {
                let { nickName } = userInfo, { user } = this, params = { ...user, nickName };
                this.disabled = true
                updateUser(params).then(res => {
                    this.disabled = false;
                    if(res.code == 200){
                        this.setUser(res||{})
                        uni.navigateBack()
                    }
                })
            }

            // let { iv, encryptedData } = e.detail, { openid } = await getToken()
            // getMblNoByWx({ iv, openId: openid, data: encryptedData }).then(data => {
            //     let { token, code } = data;
            //     if (code == 200) {
            //         this.setToken(token || '')
            //         this.setUser(data || {})
            //         uni.navigateBack()
            //     }
            //     console.log(data)
            // })
        }
    }
}
</script>
<style lang="scss" scoped>
.login {
    width: 100vw;
    height: 100vh;

    .logo {
        width: 440upx;
    }

    .btn-block {
        margin-top: 276upx;

        .btn-bg {
            width: 376upx;
        }

        .btn {
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            color: #fff;
            font-size: 50upx;
            background: transparent;
            padding: 0;
            margin: 0;

            &:after {
                display: none;
            }
        }
    }

}
</style>