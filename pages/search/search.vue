<template>
	<view class="search">
		<searchView searchType='input' :inputValue='searchValue'></searchView>
		<view class="history-box" v-if="isShow">
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
		<view class="list" v-else>
			<goodsItemView v-for="item in lists" :key='item.classid' :items='item'></goodsItemView>
		</view>
	</view>
</template>

<script>
	import searchView from '@/components/search/search';
	import goodsItemView from '@/components/goods/item';
	export default {
		data() {
			return {
				searchValue: '',
				isShow: 0,
				lists: []
			}
		},
		components:{searchView,goodsItemView},
		onLoad(e) {
			console.log(e)
			this.searchValue = e.value;
			this.getData();
		},
		methods: {
			getData (e) {
				var t = this;
				uni.request({
					url: t.$serverUrl + '/search',
					data: { 
						appkey: t.$appkey,
						keyword: t.searchValue,
						num: 60
					},
					success: (ret) => {
						if (ret.statusCode !== 200) {
							t.isShow = !0
							console.log('请求失败', ret)
							return;
						};
						const data = ret.data.result.list;
						t.lists = data;
					}
				});
			},
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
