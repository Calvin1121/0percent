<template>
    <view class="flex block flex-column">
        <navbar />
        <view class="poster-block flex-1 flex flex-column align-items-center justify-content-center">
            <view class="poster">
                <canvas id="poster" canvas-id="poster"></canvas>
            </view>
            <view class="save font30 color-fff flex align-items-center justify-content-center m-t-25">保存图片</view>
        </view>
    </view>
</template>
<script>
const img = '../../static/img.png'
export default {
    name: 'poster',
    created(){
    	this.draw()
    },
    methods:{
    	draw(){
    		let ctx = wx.createCanvasContext("poster"); 
    		ctx.setFillStyle ("#ffffff")
    		ctx.rect(0, 0, uni.upx2px(664), uni.upx2px(1030))
    		ctx.fill()
    		ctx.drawImage(img, 0, 0, uni.upx2px(664), uni.upx2px(440));
    		ctx.save();
    		ctx.beginPath();
    		ctx.fillStyle = "#342369";
    		ctx.font = `normal bold ${uni.upx2px(36)}px sans-serif`;
    		ctx.fillText('c64', uni.upx2px(28), uni.upx2px(510));
    		ctx.font = `normal regular ${uni.upx2px(30)}px sans-serif`;
    		ctx.fillText('crp keycaps', uni.upx2px(28), uni.upx2px(560));
    		ctx.font = `normal regular ${uni.upx2px(28)}px sans-serif`;
    		ctx.fillText('MDA高度键帽，由MELGEEK制造', uni.upx2px(28), uni.upx2px(610));
    		ctx.font = `normal bold ${uni.upx2px(40)}px sans-serif`;
    		ctx.fillText('长按识别小程序', uni.upx2px(36), uni.upx2px(850));
    		ctx.font = `normal regular ${uni.upx2px(28)}px sans-serif`;
    		ctx.fillText('好货要和朋友一起分享', uni.upx2px(36), uni.upx2px(910));
    		ctx.draw()
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
    box-shadow: 0upx 0upx 10upx 4upx #CCCCCC;
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