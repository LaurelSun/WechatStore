<script src="/weixinstore/js/vendor/jquery-2.1.1.min.js"></script>
<script src="/weixinstore/js/vendor/bootstrap.min.js"></script>
<script>
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		window.shareData = {
			"timeLineLink": window.location.href,//分享到好友链接
			"sendFriendLink": window.location.href,//分享到朋友圈链接
			"tTitle":"惠普微商城",//分享到好友TITLE
			"tContent":" ",//分享到好友概述
			"img_url":"http://h30419.www3.hp.com/weixinstore/img/logo-img.jpg"//分享图片 28*28
		};

	   // 发送给好友
	   WeixinJSBridge.on('menu:share:appmessage', function (argv) {
	      WeixinJSBridge.invoke('sendAppMessage', {
	          "img_url": window.shareData.img_url,
	          "link": window.shareData.sendFriendLink,
	          "desc": window.shareData.tTitle,
	          "title": window.shareData.tTitle
	      }, function (res) {
	          _report('send_msg', res.err_msg);
	      })
	   });

	   // 分享到朋友圈
	   WeixinJSBridge.on('menu:share:timeline', function (argv) {
	      WeixinJSBridge.invoke('shareTimeline', {
	          "img_url": window.shareData.img_url,
	          "link": window.shareData.timeLineLink,
	          "desc": window.shareData.tContent,
	          "title": window.shareData.tTitle
	      }, function (res) {
	          _report('timeline', res.err_msg);
	      });
	   });
	}, false)

</script>