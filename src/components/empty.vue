<template>
	<view class="empty fixed flex align-items-center justify-content-center flex-column">
		<image class="icon" src="/static/empty.png" mode="widthFix"></image>
		<view class="text color-999 font-24  m-t-30">暂无数据</view>
	</view>
</template>
<script>
export default{
	data(){
		return{

		}
	}
}
</script>
<style lang="scss" scoped>
.empty{
	width: 100vw;
	height: 100vh;
	left: 0;
	top: 0;
	z-index: 0;
	filter:grayscale(0);
	.icon{
		width: 300upx;
	}
}
</style>