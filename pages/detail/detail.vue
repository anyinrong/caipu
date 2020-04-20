<template>
	<view class="detail">
		<view v-show="isShow">
			<image  class="goods-image" :src="detail.pic" mode="aspectFill"></image>
			<view class="detail-info">
				<view class="goods-title">{{ detail.name }}</view>
				<view class="goods-detail">{{ detail.content }}</view>
				<view class="goods-text">
					<text>适合: {{ detail.cookingtime }}</text>
					<text>时间: {{ detail.peoplenum }}</text>
				</view>
				<view class="material">
					<view class="material-title">用料</view>
					<view class="material-list">
						<view class="material-item" v-for="(v,i) in detail.material" :key='i'>
							<text>{{ v.mname}}</text>
							<text>{{ v.amount}}</text>
						</view>
					</view>
				</view>
				<view class="method">
					<view class="method-title">做法</view>
					<view class="method-list">
						<view class="method-item" v-for="(v,i) in detail.process" :key='i'>
							<image :src="v.pic" mode="aspectFit"></image>
							<view class="method-text">
								{{i+1}} : {{ v.pcontent }}
							</view>
						</view>
					</view>
				</view>
			</view>
			<shareView></shareView>
		</view>
	</view>
</template>

<script>
	import shareView from '@/components/share/share';
	export default {
		data() {
			return {
				detail: '',
				isShow: 0
			}
		},
		components:{shareView},
		onLoad(e) {
			this.getData(e.id);
			console.log(e.id)
		},
		methods: {
			getData (id) {
				var t = this;
				uni.showLoading({
					title: "加载中"
				});
				uni.request({
					url: t.$serverUrl + '/detail',
					data: { 
						appkey: t.$appkey,
						id: id
					},
					success: (ret) => {
						const data = ret.data.result;
						t.detail = data;
						uni.hideLoading();
						t.isShow = !t.isShow;
					}
				});
				
			},
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				return {
					title: this.detail.name,
					desc: this.detail.content,
					imageUrl: this.detail.pic,
					success: res => {},
					fail: err => {}
				}
			}
			return {
				title: this.detail.name,
				desc: this.detail.content,
				imageUrl: this.detail.pic,
				success: res => {},
				fail: err => {}
			}
		}
	}
</script>

<style scoped lang="less">
	.detail {
		padding-bottom: 24rpx;
		.goods-image {
			width: 100%;
			height: 660rpx;
		}
		.detail-info {
			margin: 0 24rpx;
			.goods-title {
				font-size: 32rpx;
				color: #333333;
				padding: 24rpx 0;
			}
			.goods-text {
				font-size: 26rpx;
				color: #999999;
				margin-top: 24rpx;
				text {
					margin-right: 24rpx;
				}
			}
			.goods-detail {
				font-size: 28rpx;
				color: #666666;
			}
			.material-title, .method-title {
				font-size: 32rpx;
				color: #333333;
				padding: 24rpx 0;
			}
			.material-list {
				display: flex;
				flex-flow: row wrap;
				.material-item {
					padding: 8rpx 24rpx;
					background-color: #F5DEB3;
					border-radius: 30rpx;
					font-size: 26rpx;
					color: #666666;
					margin: 0 12rpx 24rpx;
					text {
						padding: 0 12rpx;
					}
				}
			}
			.method-list {
				.method-item {
					padding: 24rpx 0;
					border-top: 2rpx solid rgba(0,0,0,.08);
				}
				image {
					width: 100%;
					height: 564rpx;
					border-radius: 12rpx;
				}
				.method-text {
					font-size: 28rpx;
					color: #666666;
				}
			}
		}
		
	}
</style>
