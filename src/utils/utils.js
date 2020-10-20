const upxToPx = (upx) => {
    return upx / 750 * uni.getSystemInfoSync().windowWidth;
}
export {
	upxToPx
}