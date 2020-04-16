<template>
	<view class="grid">
		<view class="grid-c-06" v-for="item in dataList" :key="item.guid">
			<view class="panel" @click="goDetail(item)">
				<image class="card-img card-list2-img" :src="item.img_src"></image>
				<text class="card-num-view card-list2-num-view">{{item.img_num}}P</text>
				<view class="card-bottm row">
					<view class="car-title-view row">
						<text class="card-title card-list2-title">{{item.title}}</text>
					</view>
					<view @click.stop="share(item)" class="card-share-view"></view>
				</view>
			</view>
		</view>
		<view class="grid-c-12">
			<text class="loadMore">{{loadMoreText}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(e) {
		},
		methods: {
	
		}
	}
</script>

<style scoped>
	.grid {
		padding-top: 10px;
	}

	.grid-c-12 {
		justify-content: center;
	}
</style>
