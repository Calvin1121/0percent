<template>
	<view class="content">
		<navbar />
		<view class="main flex flex-wrap justify-content-space-between p-l-20 p-r-20 p-t-40 p-b-40">
			<view class="item-block m-b-30" v-for="(item, index) in [1,2,3,4,5,6,7,8,9]" :key="index">
				<item />
			</view>
		</view>
		<tabbar />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: ''
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
.item-block{
	width: 345upx;
}
</style>
