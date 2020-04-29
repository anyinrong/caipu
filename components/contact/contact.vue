<template>
	<view class="contact">
		<button type="default" class="contact-btn" open-type="contact">
			<text class="iconfont icon-xiaomi"></text>
			<view>客服</view>
		</button>
	</view>
</template>

<script>
</script>

<style scoped lang="less">
	.contact {
		.contact-btn {
			position: fixed;
			bottom: 20%;
			right: 24rpx;
			z-index: 999999;
			width: 88rpx;
			height: 88rpx;
			line-height: 32rpx;
			font-size: 24rpx;
			color: #FFFFFF;
			padding: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			background-color: rgba(0,0,0,0.6)!important;
		}
		.contact-btn {
			border: none;
		}
	}
</style>
