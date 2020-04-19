<template>
	<view class="search">
		<view v-show="hidden">
			<searchView :searchType='searchType' :inputValue='searchValue'></searchView>
			<view class="history-box" v-if="isShow">
				<view class="history">
					<view class="history-title">
						<view class="history-text">
							热门搜索
						</view>
					</view>
					<view class="history-list">
						<view class="history-item" @click="getData('蛋糕')">蛋糕</view>
						<view class="history-item" @click="getData('养生')">养生</view>
					</view>
				</view>
			</view>
			<view class="list" v-else>
				<goodsItemView v-for="item in lists" :key='item.classid' :items='item'></goodsItemView>
				<view class="cue-text" v-if="lists.length==0">
					- - 暂无相关数据 - -
				</view>
			</view>
			<shareView></shareView>
		</view>
	</view>
</template>

<script>
	import searchView from '@/components/search/search';
	import goodsItemView from '@/components/goods/item';
	import shareView from '@/components/share/share';
	export default {
		data() {
			return {
				searchValue: '',
				isShow: 0,
				hidden: 0,
				lists: [],
				classid: 0,
				searchType: 'input',
				start: 0
			}
		},
		components:{searchView,goodsItemView,shareView},
		onLoad(e) {
			this.searchValue = e.value;
			this.classid = e.classid;
			console.log(e)
			uni.showLoading({
				title: '加载中'
			});
			this.onReachBottomData();
		},
		onReachBottom(e) {
			this.start += 20;
			this.onReachBottomData();
		},	
		methods: {
			onReachBottomData (e) {
				const t = this;
				if(t.classid == '') return;
				
				uni.request({
					url: t.$serverUrl + '/byclass',
					data: { 
						appkey: t.$appkey,
						classid: t.classid,
						start: t.start,
						num: 20
					},
					success: (ret) => {
						const data = ret.data.result;
						t.lists = t.lists.concat(data.list);
						uni.hideLoading();
						t.hidden = 1;
						if(data.length==0) t.isShow = !0;
					}
				});
			},
			getData (e) {
				var t = this;
				t.classid = '';
				uni.request({
					url: t.$serverUrl + '/search',
					data: { 
						appkey: t.$appkey,
						keyword: e,
						num: 60
					},
					success: (ret) => {
						const data = ret.data.result.list;
						uni.hideLoading();
						t.hidden = 1;
						if(data.length==0) {
							return t.isShow = !0;
						} else {
							t.isShow = !1
							t.lists = data;
						}
					}
				});
				
			},
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				return {
					title: '印记菜谱',
					desc: "学菜谱,就用印记菜谱,厨房小能手就是你~~~",
					success: res => {},
					fail: err => {}
				}
			}
			return {
				title: '印记菜谱',
				desc: "学菜谱,就用印记菜谱,厨房小能手就是你~~~",
				success: res => {},
				fail: err => {}
			}
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
