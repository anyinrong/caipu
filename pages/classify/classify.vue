<template>
	<view class="classify">
		<searchView></searchView>
		<view class="content" :style="'height:' + (screenHeight-44) + 'px'">
			<scroll-view scroll-y="true" class="scroll-lefy">
				<view class="scroll-lefy-item select">热门</view>
				<view class="scroll-lefy-item">精选</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="scroll-right">
				<view class="scroll-right-item">家常菜</view>
				<view class="scroll-right-item">家常菜</view>
				<view class="scroll-right-item">家常菜</view>
				<view class="scroll-right-item">家常菜</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import searchView from '@/components/search/search';
	export default {
		data() {
			return {
				screenHeight: 0,
			}
		},
		components:{searchView},
		onLoad(e) {
			uni.getSystemInfo({
				success: (o) => {
					console.log(o)
					this.screenHeight = o.windowHeight;
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="less">
	.content {
		display: flex;
		font-size: 24rpx;
		.scroll-lefy {
			width: 22%;
			background-color: rgba(0,0,0,0.06);
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			.scroll-lefy-item {
				width: 100%;
				height: 64rpx;
				line-height: 64rpx;
				text-align: center;
				color: #666666;
				&.select {
					border-left: 4rpx solid #f05b72;
					background-color: #ffffff;
				}
			}
		}
		.scroll-right {
			margin: 0 12rpx;
			.scroll-right-item {
				display: inline-block;
				width: 158rpx;
				height: 56rpx;
				margin: 24rpx 12rpx 12rpx;
				line-height: 56rpx;
				text-align: center;
				color: #999999;
				border: 1rpx solid #cccccc;
				border-radius: 30rpx;
			}
		}
	}
</style>
