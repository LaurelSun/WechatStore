/**
* 初始化iScroll控件
*/
var myScroll, navScroll,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
function pullUpAction() {
    setTimeout(function () {
        type = $('.typeTag a.active').attr('rel');
        pages++;
        keywords = $('#txtHide').val(); //sun update
		  
        doAjax(type, pages, keywords);
        //$('#thelist').append(_everyData);
        //myScroll.refresh();
    }, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
	 
    //alert(2)
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    myScroll = new iScroll('index-wrapper', {
        scrollbarClass: 'myScrollbar', /* 重要样式 */
        //useTransition: false, /* 此属性不知用意，本人从true改为false */
        hScrollbar: false,
        vScrollbar: false,
        mouseWheel: true,
        preventDefault: false,
        checkDOMChanges: true,
        onRefresh: function () {
            if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
					 
            }
        },
        onScrollMove: function () {
            if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
				 
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				 
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
			
                if (isLoad == true) {
					
                  pullUpAction(); // Execute custom function (ajax call?)
                //myScroll.refresh();
                }
              
            }
        }
    });

    setTimeout(function () { document.getElementById('index-wrapper').style.left = '0'; }, 800);
}

function leftNav() {
    navScroll = new iScroll('typeTag', { hScrollbar: false, vScrollbar: false, mouseWheel: true, preventDefault: false, checkDOMChanges: true });
}

//初始化绑定iScroll控件 
//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//document.addEventListener('DOMContentLoaded', loaded, false); 

// 首页
var _transformX = $(window).width() * 0.55;
var type = '',
    pages = '1',
    keywords = '';
  var  isLoad = true; //sun add 

//菜单
function open() {
    $('#typeTag').css('left', '0');
    $('#nav-layer').show();
    $('.index-header, .index-wrapper, .index-popup').animate({
        "transform": "translateX(" + _transformX + "px)"
    }, 600);
    // $('.index-footer').animate({
    // 	"transform": "translateX(" + _transformX + "px)"
    // },600);
    setTimeout("$('.menu-oc').attr('rel','open')", 800);
}
function close() {
    $('#nav-layer').hide();
    $('.index-header, .index-wrapper, .index-popup').animate({
        "transform": "translateX(0)"
    }, 600);
    // $('.index-footer').animate({
    // 	"transform": "translateX(0)"
    // },600);
    setTimeout("$('.menu-oc').attr('rel','close');", 800); //$('#typeTag').css('left','-55%');
}
function doAjax(type, pages, keywords) {
    $.ajax({
        url: '/weixinstore/ajax/getproductlist.ashx', //   data.json
        type: 'GET',
        cache: false,
        async: false,
        dataType: 'json',
        data: 'cid=' + type + '&page=' + pages + '&keyword=' + keywords,
        success: function (data) {
				  
            if (data.result == 'true') {
                strHtml(data);
            }
            //alert(1)

        }
    })
}
function strHtml(data) {
    var html = '';
    var vipJg;
    $('.proNumber-0').html(data.count);
    $('.total-price').html(data.price);
    if (data.isLogin == 'false') {
        vipJg = '<p><a href="' + data.loginUrl + '">注册会员享受更多优惠</a></p>';
    } else {
        vipJg = '';
    }
    if (data.isfin == 'true') {
        $('#pullUp').hide();
        isLoad = false;
    }
    for (var i = 0; i < data.productList.length; i++) {
        html += '<li><ul>';
        html += '<li><a href="' + data.productList[i].productUrl + '" style="border:0;"><img src="' + data.productList[i].imgUrl + '" alt="" border="0"></a></li>';
        html += '<li>';
        html += '<h3>' + data.productList[i].productName + '</h3>';
        html += '<p>微信价:<span>&#65509;<b class="unitPrice">' + data.productList[i].productPrice + '</b></span></p>';
        html += vipJg;

        if (data.productList[i].productExist == true) {
            html += '<div class="div-spinner">';
            html += '<button type="button" class="btn btn-default btn-spinner spinner-sub"></button>';
            html += '<input type="text" class="txt-spinner" id="' + data.productList[i].productId + '" value="' + data.productList[i].productNum + '" readonly>';
            html += '<button type="button" class="btn btn-default btn-spinner spinner-add"></button>';
            html += '</div>';
        } else {
            html += ' <p class="p-oos" >  此商品暂时售完 </p>';
        }        
        
        
        html += '</li>';
        html += '<li><a href="' + data.productList[i].productUrl + '" style="display:block; border:0;">&nbsp;</a></li>';
        html += '</ul></li>';
    };
    $('.countList').append(html);
    changeNum();

}

//获取url参数
function GetUrlParms() {
    var args = new Object();
    var query = location.search.substring(1); //获取查询串  
    var pairs = query.split("&"); //在'&'符号处断开  
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('='); //查找name=value  
        if (pos == -1) continue; //如果没有找到就跳过  
        var argname = pairs[i].substring(0, pos); //提取name  
        var value = pairs[i].substring(pos + 1); //提取value  
        args[argname] = unescape(value); //存为属性  
    }
    return args;
}

//(function(win, $) {
$(function () {
    //myScroll = new iScroll('index-wrapper', { hScrollbar: false, vScrollbar: false, mouseWheel: true, preventDefault: false });

    //获取rul参数
    var args = new Object();
    args = GetUrlParms();

    var type = args["type"];
    var key = args["key"];
		  
    //载入左导航，初始化iscroll
    leftNav();
    loaded();



    //url参数中有分类时，初始化分类导航状态；
    if ((key != '' || key == undefined) && type != '' && type != undefined) {
        $('#typeWrap a').removeClass('active')
        $('#typeWrap a').each(function (i, n) {
            if ($(this).attr('rel') == type) {
                $(this).addClass('active');
            }
        })

    } else {

        type = '0';
    }

    if (key != '' && key != undefined) {
        key = decodeURI(key);
        $('#txtHide').val(key);
        $('.searchTxt').val(key);
        keywords = key;
    }
    doAjax(type, pages, keywords);



    //$('#page').css('transform','translateX(0)');
    //$('#page').height($(window).height() - 50 +'px');

    $('.menu-oc').unbind().bind('click', function () {
        //alert($(this).attr('rel'))
        if ($(this).attr('rel') == undefined || $(this).attr('rel') == 'close') {
            open();
        } else {
            close();
        }
    })
    $('.index-header, .index-wrapper, .index-popup, #nav-layer').unbind().bind('click', function () {
        if ($('.menu-oc').attr('rel') == 'open') {
            close();
        }
    })


    //分类状态
    $('#typeWrap a').each(function (i, n) {
        $(this).click(function () {
            $('.countList').html(''); //清空
            $('#typeWrap a').removeClass('active');
            $(this).addClass('active');
            close();
            $('#txtHide').val('');
            $('.searchTxt').val('');
            //分类加载
            type = $(this).attr('rel');
            pages = 1;
            keywords = '';
            doAjax(type, pages, keywords);
        })
    })

    //搜索
    $(document).keypress(function (e) {
        if (e.keyCode == 13) {
            $('.countList').html(''); //清空
            type = $('#typeWrap a.active').attr('rel');
            pages = 1;
            keywords = $('.searchTxt').val();
            $('#txtHide').val(keywords);

            $('#typeWrap a.active').removeClass('active');
            $('#typeWrap li').eq(0).find('a').addClass('active');
            doAjax(type, pages, keywords);
        }
    })

    $('.searchBtn').click(function() {
        $('.countList').html(''); //清空
        type = $('#typeWrap a.active').attr('rel');
        pages = 1;
        keywords = $('.searchTxt').val();
        $('#txtHide').val(keywords);

        $('#typeWrap a.active').removeClass('active');
        $('#typeWrap li').eq(0).find('a').addClass('active');
        doAjax(type, pages, keywords);
    });
});
//})(window, window.jQuery);
