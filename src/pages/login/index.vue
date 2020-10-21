<template>
    <view class="login bg-6448B5 flex align-items-center flex-column justify-content-center">
        <image class="logo" mode="widthFix" src="../../static/logo@2x.png"></image>
        <view class="btn-block relative">
            <image class="btn-bg" src="../../static/kuang@2x.png" mode="widthFix"></image>
            <button class="btn absolute flex align-items-center justify-content-center" open-type="getUserInfo" @getuserinfo="getuserinfo">微信授权登录</button>
        </view>
    </view>
</template>
<script>
export default {
    name: 'detail',
    methods: {
        getuserinfo(e) {
            console.log(e)
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
    	.btn-bg{
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
            margin:0;
            &:after{
            	display: none;
            }
        }
    }

}
</style>