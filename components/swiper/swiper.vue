<template>
	<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		<swiper-item class="swiper-item">
			<image src="http://img.zcool.cn/community/01222658a6f9caa801219c779f468b.jpg" mode=""></image>
		</swiper-item>
		<swiper-item class="swiper-item">
			<image src="http://img.zcool.cn/community/01222658a6f9caa801219c779f468b.jpg" mode=""></image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad(e) {},
		methods: {}
	}
</script>

<style scoped lang="less">
	.swiper {
		width: 100%;
		height: 326rpx;
		.swiper-item {
			width: 100%;
			height: 100%;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
