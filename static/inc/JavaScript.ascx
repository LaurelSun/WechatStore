<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="JavaScript.ascx.cs" Inherits="CCWOnline.Management.Web.weixinstore.inc.JavaScript" %>
<script src="/weixinstore/js/vendor/jquery-2.1.1.min.js"></script>
<script src="/weixinstore/js/vendor/bootstrap.min.js"></script>
<script type="text/javascript">

    function showAlert(str,url) {
        $('#myModal .modal-body p').html(str);
        $('#myModal').modal();
        if (url != "" && url != undefined) {
            $('#btnOk').click(function() {
                location.replace(url);
            });
        }

    }

    function reloadPage(time) {
        $.get('/weixinstore/ajax/gettime.ashx', { span: new Date().getSeconds() }, function (data) {
            if (compareTime(time, data)) {

                location.reload();
            }
        });
    }


    function compareTime(starttime, endtime) {
        var start = new Date(starttime.replace(/-/g, '/'));
        var end = new Date(endtime.replace(/-/g, '/'));

        var span = end.getTime() - start.getTime();

        if (span > 4000||span<0) {
            return true;
        } else {
            return false;
                }

    }

    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		window.shareData = {
			"timeLineLink": window.location.href,//分享到好友链接
			"sendFriendLink": window.location.href,//分享到朋友圈链接
			"tTitle":"惠普微商城",//分享到好友TITLE
			"tContent":"粉丝喜欢什么，我们就便宜什么！官方直营，正品保证，限时全场包邮，现在不造更待何时！",//分享到好友概述
			"img_url":"http://h30419.www3.hp.com/weixinstore/img/logo-img.jpg"//分享图片 28*28
		};

	   // 发送给好友
	   WeixinJSBridge.on('menu:share:appmessage', function (argv) {
	      WeixinJSBridge.invoke('sendAppMessage', {
	          "img_url": window.shareData.img_url,
	          "link": window.shareData.sendFriendLink,
	          "desc": window.shareData.tContent,
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