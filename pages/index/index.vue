<template>
	<view class="index">
		<view v-show="isShow">
			<searchView></searchView>
			<swiperView></swiperView>
			<groomView></groomView>
			<goodsView :lists='lists' @handleguess='handleGuess'></goodsView>
			<shareView></shareView>
			<!-- #ifdef MP-TOUTIAO -->
			<contactView></contactView>
			<!-- #endif -->
		</view>
		<!-- #ifdef MP-TOUTIAO -->
		<view v-show="!isShow" class="toutao-icon">
			<image :src="require('../../static/today-icon.gif')" mode="aspectFill"></image>
		</view>
		<!-- #endif -->
		
	</view>
</template>

<script>
	import searchView from '@/components/search/search';
	import swiperView from '@/components/swiper/swiper';
	import groomView from '@/components/groom/groom';
	import goodsView from '@/components/goods/goods';
	import shareView from '@/components/share/share';
	import contactView from '@/components/contact/contact';
	
	const searcharr = [377,302,317,310,231,572,323,224,303,304,2,417,567,247,404,414,227,599,233,234,313,230,315,224,232,231,238,229,228,225];
	export default {
		data() {
			return {
				lists: '',
				isShow: 0
			}
		},
		components:{searchView,swiperView,groomView,goodsView,shareView,contactView},
		onLoad(e) {
			this.getData();
		},
		onPullDownRefresh() {
			this.getData();
		},
		methods: {
			getData(e) {
				var t = this;
				uni.request({
					url: t.$serverUrl + '/byclass',
					data: { 
						appkey: t.$appkey,
						classid: searcharr[this.random(1,30)],
						start: 0,
						num: 18,
					},
					success: (ret) => {
						const data = ret.data.result.list;
						t.lists = data;
						uni.stopPullDownRefresh();
						t.isShow = 1;
					}
				});
			},
			handleGuess () {
				this.getData();
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				return {
					title: '美食秘籍',
					desc: "美食推荐 · 精选美食做法",
					success: res => {},
					fail: err => {}
				}
			}
			
			return {
				title: '美食秘籍',
				desc: "美食推荐 · 精选美食做法",
				success: res => {},
				fail: err => {}
			}
		}
	}
</script>

<style lang="less">
	
	
</style>
