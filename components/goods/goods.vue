<template>
	<view class="goods">
		<view class="title">
			<!-- <text class="iconfont icon-huatifuhao"></text> -->
			精品推荐
			<!-- <text class="iconfont icon-huatifuhao"></text> -->
			<view class="guess" @click="getGuess">
				<text class="iconfont icon-shuaxin1"></text>
				<text class="guess-ic">换一换</text>
			</view>
		</view>
		<view class="goods-list">
			<!-- 双列 -->
			<!-- <view class="goods-item" v-for="item in newlists" :key='item.id' @click="goDetail(item.id)">
				<view class="goods-image" :style="{backgroundImage:'url('+item.pic+ ')'}">
					
				</view>
				<view class="goods-info">
					<view class="goods-title">
						{{ item.name }}
					</view>
					<text class="iconfont icon-remen"></text>
				</view>
				<view class="goods-detail">
					{{ item.tag }}
				</view>
			</view> -->
			<!-- 单列 -->
			<block v-for="(item,index) in newlists" :key="index">
				<goodsItemView :items='item'></goodsItemView>
				<!-- #ifdef MP-TOUTIAO -->
				<template v-if="(index+1)%6==0">
					<ad type="lImg" scale="110"
						unit-id="9f4d45cl8h49prqdnd"
						@close="adcloseMore"
					></ad>
				</template>
				<!-- #endif -->
			</block>
		</view>
		<view class="cue-text" v-if="newlists.length==0">
			- - 暂无相关数据 - -
		</view>
		<navigator v-if="newlists.length>0" open-type="switchTab" url="../../pages/classify/classify" class="more">查看更多</navigator>
	</view>
</template>

<script>
	import goodsItemView from '@/components/goods/item';
	export default {
		data(){
			return {
				newlists: []
			}
		},
		components:{goodsItemView},
		props:{
			lists: {
				type: Array,
				value: []
			}
		},
		watch:{
	　　　　lists(){
	　　　　　　this.newlists = this.lists
	　　　　}
	　　},
		methods: {
			goDetail (item) {
				uni.navigateTo({
					url: '../detail/detail?id=' + item
				})
			},
			getGuess () {
				this.$emit('handleguess');
			}
		}
	}
</script>

<style scoped lang="less">
	.goods {
		.title {
			font-size: 36rpx;
			color: #333333;
			// text-align: center;
			padding-left: 24rpx;
			padding-top: 24rpx;
			border-top: 16rpx solid rgba(0,0,0,0.06);
			box-sizing: border-box;
			position: relative;
			.guess {
				position: absolute;
				right: 24rpx;
				top: 16rpx;
				height: 100%;
				display: flex;
				align-items: center;
				.guess-ic {
					color: #999999;
					font-size: 24rpx;
					margin-left: 8rpx;
				}
				.iconfont {
					color: red;
					font-size: 28rpx;
				}
			}
		}
		.goods-list{
			display: flex;
			flex-flow: row wrap;
			// margin: 0 12rpx;
			padding: 12rpx 0;
			.goods-item {
				width: 50%;
				margin: 0 auto;
				padding: 12rpx 12rpx;
				box-sizing: border-box;
				.goods-image {
					width: 100%;
					height: 338rpx;
					margin-bottom: 24rpx;
					background-repeat: no-repeat;
					background-size: cover;
					background-position: center;
					overflow: hidden;
				}
				.goods-info {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					font-size: 26rpx;
					.goods-title {
						font-size: 32rpx;
						color: #333333;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					text {
						color: red;
					}
				}
				.goods-detail {
					font-size: 26rpx;
					color: #999999;
					margin-top: 12rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					text {
						margin-right: 24rpx;
					}
				}
			}
		}
		
		.more {
			text-align: center;
			padding: 12px 0;
			color: #999999;
			font-size: 14px;
			background: rgba(0,0,0,.04);
		}
	}
</style>
