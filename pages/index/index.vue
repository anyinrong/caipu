<template>
	<view class="index">
		<view class="search-box">
			<navigator url="../search/search" class="search">
				<text class="iconfont icon-sousuo "></text>
				<text>搜索菜谱,食材</text>
			</navigator>
		</view>
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="swiper-item">
				<image src="http://img.zcool.cn/community/01222658a6f9caa801219c779f468b.jpg" mode=""></image>
			</swiper-item>
			<swiper-item class="swiper-item">
				<image src="http://img.zcool.cn/community/01222658a6f9caa801219c779f468b.jpg" mode=""></image>
			</swiper-item>
		</swiper>
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
		
	</view>
</template>

<script>
	const searcharr = ['白菜','土豆','五花肉','茄子','西红柿'];
	export default {
		data() {
			return {

			}
		},
		onLoad(e) {
			this.getData();
		},
		methods: {
			getData(e) {
				var t = this;
				uni.request({
					url: t.$serverUrl + '/search',
					data: { 
						appkey: t.$appkey,
						keyword: searcharr[0],
						num: 20 ,
					},
					success: (ret) => {
						if (ret.statusCode !== 200) {
							console.log('请求失败', ret)
							return;
						};
						console.log(ret,'数据');
					}
				});
			},
		}
	}
</script>

<style lang="less">
	.search-box {
		width: 100%;
		height: 88rpx;
		padding-bottom: 24rpx;
		box-sizing: border-box;
		background-color: #333333;
		.search {
			width: 94%;
			height: 100%;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			color: #CCCCCC;
			background-color: #FFFFFF;
			border-radius: 12rpx;
		}
	}
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
