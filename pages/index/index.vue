<template>
	<view class="index">
		<searchView></searchView>
		<swiperView></swiperView>
		<groomView></groomView>
		<goodsView></goodsView>
	</view>
</template>

<script>
	import searchView from '@/components/search/search';
	import swiperView from '@/components/swiper/swiper';
	import groomView from '@/components/groom/groom';
	import goodsView from '@/components/goods/goods';
	
	const searcharr = ['白菜','土豆','五花肉','茄子','西红柿'];
	export default {
		data() {
			return {

			}
		},
		components:{searchView,swiperView,groomView,goodsView},
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
	
	
</style>
