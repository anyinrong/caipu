<template>
	<view class="classify">
		<searchView></searchView>
		<view class="content" :style="'height:' + (screenHeight-44) + 'px'">
			<scroll-view scroll-y="true" class="scroll-lefy">
				<view class="scroll-lefy-item"
						:class="{select:index == i}"
						v-for="(item,i) in lists" 
						:key='item.classid'
						@click="getItem(item,i)">
						{{ item.name }}
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="scroll-right">
				<view class="scroll-right-item" 
					v-for="(item,i) in items"
					:key='item.classid'
					@click="goSearch(item)">
					{{ item.name }}
				</view>
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
				lists: [],
				items: [],
				index: 0
			}
		},
		components:{searchView},
		onLoad(e) {
			uni.getSystemInfo({
				success: (o) => {
					console.log(o)
					this.screenHeight = o.windowHeight;
				}
			});
			this.getData();
		},
		methods: {
			getData (e) {
				var t = this;
				uni.request({
					url: t.$serverUrl + '/class',
					data: { 
						appkey: t.$appkey,
					},
					success: (ret) => {
						if (ret.statusCode !== 200) {
							console.log('请求失败', ret)
							return;
						};
						const data = ret.data.result;
						t.lists = data;
						t.items = data[t.index].list;
					}
				});
			},
			getItem (item,i) {
				this.index = i;
				this.items = item.list;
			},
			goSearch (item) {
				uni.navigateTo({
					url: '../search/search?value=' + item.name + '&classid=' + item.classid
				})
			}
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
				height: 68rpx;
				line-height: 68rpx;
				text-align: center;
				color: #666666;
				&.select {
					color: #f05b72;
					border-left: 4rpx solid #f05b72;
					background-color: #ffffff;
				}
			}
		}
		.scroll-right {
			margin: 0 12rpx;
			padding-bottom: 24rpx;
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
