<template>
	<view class="index">
		<searchView></searchView>
		<swiperView></swiperView>
		<groomView></groomView>
		<goodsView :lists='lists'></goodsView>
		<shareView></shareView>
	</view>
</template>

<script>
	import searchView from '@/components/search/search';
	import swiperView from '@/components/swiper/swiper';
	import groomView from '@/components/groom/groom';
	import goodsView from '@/components/goods/goods';
	import shareView from '@/components/share/share';
	
	const searcharr = [377,302,303,317,310,317,313,315,224,2];
	export default {
		data() {
			return {
				lists: ''
			}
		},
		components:{searchView,swiperView,groomView,goodsView,shareView},
		onLoad(e) {
			this.getData();
		},
		methods: {
			getData(e) {
				var t = this;
				uni.request({
					url: t.$serverUrl + '/byclass',
					data: { 
						appkey: t.$appkey,
						classid: searcharr[this.random(1,10)],
						start: 30,
						num: 20
					},
					success: (ret) => {
						if (ret.statusCode !== 200) {
							console.log('请求失败', ret)
							return;
						};
						const data = ret.data.result.list;
						t.lists = data;
					}
				});
			},
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				return {
					title: '印记菜谱',
					desc: "学菜谱,就用印记菜谱,厨房小能手就是你~~~",
					imageUrl: require('../../static/xiafan.png'),
					success: res => {},
					fail: err => {}
				}
			}
			return {
				title: '印记菜谱',
				desc: "学菜谱,就用印记菜谱,厨房小能手就是你~~~",
				imageUrl: require('../../static/xiafan.png'),
				success: res => {},
				fail: err => {}
			}
		}
	}
</script>

<style lang="less">
	
	
</style>
