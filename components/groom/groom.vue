<template>
	<view class="groom">
		<view class="groom-info">
			<view class="groom-title">每日推荐</view>
			<view class="groom-more">
				查看更多
			</view>
		</view>
		<view class="groom-group">
			<view class="groom-group-item">
				<image src="http://5b0988e595225.cdn.sohucs.com/images/20190923/03ab81710fd44e0a833940a68382c001.jpeg" mode=""></image>
				<view>清淡</view>
			</view>
			<view class="groom-group-item">
				<image src="http://5b0988e595225.cdn.sohucs.com/images/20190923/03ab81710fd44e0a833940a68382c001.jpeg" mode=""></image>
				<view>家常菜</view>
			</view>
			<view class="groom-group-item">
				<image src="http://5b0988e595225.cdn.sohucs.com/images/20190923/03ab81710fd44e0a833940a68382c001.jpeg" mode=""></image>
				<view>清淡</view>
			</view>
			<view class="groom-group-item">
				<image src="http://5b0988e595225.cdn.sohucs.com/images/20190923/03ab81710fd44e0a833940a68382c001.jpeg" mode=""></image>
				<view>清淡</view>
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
	.groom-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 24rpx 24rpx;
		font-size: 28rpx;
		color: #333333;
		.groom-more {
			color: #999999;
			font-size: 26rpx;
		}
	}
	.groom {
		padding: 24rpx 0;
		.groom-group {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 24rpx;
			.groom-group-item {
				width: 22%;
				height: 146rpx;
				position: relative;
				image {
					width: 100%;
					height: 100%;
					border-radius: 12rpx;
				}
				view {
					position: absolute;
					bottom: 12rpx;
					width: 100%;
					text-align: center;	
					color: #FFFFFF;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
