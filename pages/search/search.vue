<template>
	<view class="search">
		<searchView searchType='input'></searchView>
		<view class="history">
			<view class="history-title">
				<view class="history-text">
					历史搜索
				</view>
				<text class="iconfont icon-shanchu"></text>
			</view>
			<view class="history-list">
				<view class="history-item">
					家常菜
				</view>
			</view>
		</view>
		<view class="history">
			<view class="history-title">
				<view class="history-text">
					热门搜索
				</view>
			</view>
			<view class="history-list">
				<view class="history-item">蛋糕</view>
				<view class="history-item">养生</view>
			</view>
		</view>
	</view>
</template>

<script>
	import searchView from '@/components/search/search';
	export default {
		data() {
			return {

			}
		},
		components:{searchView},
		onLoad(e) {
		},
		methods: {
	
		}
	}
</script>

<style scoped lang="less">
	.history {
		.history-title {
			display: flex;
			justify-content: space-between;
			margin: 24rpx 24rpx 0;
			font-size: 28rpx;
			color: #666666;
		}
		.history-list {
			display: flex;
			flex-grow: row wrap;
			margin: 0 12rpx;
			.history-item {
				height: 56rpx;
				line-height: 56rpx;
				font-size: 26rpx;
				color: #999999;
				padding: 0 24rpx;
				margin: 24rpx 12rpx 0;
				border-radius: 30rpx;
				border: 1rpx solid #ccc;
			}
		}
	}
</style>
