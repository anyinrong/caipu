<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style>
	page {
		background-color: #ffffff!important;
	}
	.share .share-btn {
		position: fixed;
		bottom: 30%;
		right: 24rpx;
		z-index: 999999;
		width: 88rpx;
		height: 88rpx;
		line-height: 32rpx;
		font-size: 24rpx;
		color: #FFFFFF;
		padding: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: rgba(0,0,0,0.6)!important;
	}
	
	.toutao-icon {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.toutao-icon image {
		width: 260rpx;
		height: 56rpx;
	}
	
	.share .share-btn {
		border: none;
	}
	
	.cue-text {
		font-size: 26rpx;
		color: #cccccc;
		text-align: center;
		margin-top: 24rpx;
	}
</style>
