<template>
	<navigator hove-class="none" url="/pages/detail/index" class="item">
		<image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1618917910,1316838749&fm=26&gp=0.jpg" mode="aspectFill" lazy-load></image>
		<view class="main p-l-20 p-r-20 p-t-15 p-b-30">
			<view class="name-keyword-type p-b-40">
				<view class="name fw-6 color-342369 font28">c64</view>
				<view class="keyword-type flex justify-content-space-between">
					<view class="keywords color-342369 font24 align-self-flex-end">crp keycaps</view>
					<view class="type font36 fw-6 color-fff bg-FD3691">GB</view>
				</view>
			</view>
			<view class="progress-block p-l-20 p-r-20">
				<view class="progress-bar flex align-items-center relative bg-f1f1f1">
					<view class="dot absolute bg-FD3691"></view>
				</view>
			</view>
		</view>
	</navigator>
</template>
<script>
export default{
	name:'item',
}
</script>
<style lang="scss">
.item{
	width: inherit;
	background: #fff;
	box-shadow: 0px 0px 20upx 0px #CCCCCC;
	image{
		width: 100%;
		height: 230upx;
	}
	.type{
		border-radius: 50upx;
		padding: 0upx 10upx;
		min-width: 70upx;
	}
	.progress{
		height: 15upx;
		&-bar{
			width: 100%;
			height: 5upx;
			.dot{
				width: 15upx;
				height: 15upx;
				border-radius: 50%;
				top: 50%;
				left: 0;
				transform:translate(-50%,-50%)
			}
		}
	}
}
</style>