// 首页
(function(win, $) {
	$(function() {
		myScroll = new IScroll('.ShoppingCart-wrapper', { mouseWheel: true, preventDefault: false, checkDOMChanges: true });

		// 切换分类
		$(".catalog ul li").bind("click", function (event) {
			var $this = $(this);
			if ($this.hasClass("active")) {
				return;
			}
			$(".catalog ul li").removeClass("active");
			$this.addClass("active");
			// TODO: ajax更新首页列表

		});
	});
})(window, window.jQuery);