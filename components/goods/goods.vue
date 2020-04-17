<template>
	<view class="goods-list">
		<view class="goods-item">
			<image src="http://5b0988e595225.cdn.sohucs.com/images/20190923/03ab81710fd44e0a833940a68382c001.jpeg" mode=""></image>
			<view class="goods-info">
				<view class="goods-title">
					菠菜疙瘩 
				</view>
				<text class="iconfont icon-sousuo"></text>
			</view>
			<view class="goods-detail">
				<text class="goods-name">醋溜白菜</text>
				<text class="goods-num">1-2人</text>
				<text class="goods-time">"10-20分钟"</text>
			</view>
		</view>
		<view class="goods-item">
			<image src="http://5b0988e595225.cdn.sohucs.com/images/20190923/03ab81710fd44e0a833940a68382c001.jpeg" mode=""></image>
			<view class="goods-info">
				<view class="goods-title">
					菠菜疙瘩 
				</view>
				<text class="iconfont icon-sousuo"></text>
			</view>
			<view class="goods-detail">
				<text class="goods-name">醋溜白菜</text>
				<text class="goods-num">1-2人</text>
				<text class="goods-time">"10-20分钟"</text>
			</view>
		</view>
	</view>
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
	.goods-list {
		.goods-item {
			width: 94%;
			margin: 0 auto;
			padding: 24rpx 0;
			border-bottom: 2rpx solid rgba(0,0,0,0.08);
			&:last-child {
				border-bottom: 0;
			}
			image {
				width: 100%;
				height: 360rpx;
				border-radius: 12rpx;
				margin-bottom: 24rpx;
			}
			.goods-info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #999999;
				font-size: 26rpx;
				.goods-title {
					font-size: 28rpx;
					color: #333333;
				}
			}
			.goods-detail {
				font-size: 24rpx;
				color: #999999;
				margin-top: 12rpx;
				text {
					margin-right: 24rpx;
				}
			}
		}
	}
</style>
