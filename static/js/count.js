//计算总数
function totalCount(){
	 var totalPrice = new Number();
	 $('.countList > li').each(function(i, n) {
	 	var _this = $(this);
	 	var _unitPrice = $(this).find('.unitPrice').text();//单价
		var _number = $(this).find('.txt-spinner').val();//够买个数
	 	if (_this.find('.checkWrap').length > 0){
	 		var _thisCheck = _this.find('.checkWrap input');
	 		if (_thisCheck[0].checked == true){

	 			var _thisPrice = Number(_unitPrice) * Number(_number);
	 			totalPrice += _thisPrice;
	 		}
	 	}else{
	 		var _thisPrice = Number(_unitPrice) * Number(_number);
	 		totalPrice += _thisPrice;
	 	}
	 });
	 $('.total-price').html(totalPrice.toFixed(2));
}

// + -
function changeNum(){
	$('.div-spinner').each(function(i,n){
		var _this = $(this);
		var _val = $(this).find('.txt-spinner').val();
		//初始为0的，减号不可点
		if (_val == 0){
			$(this).find('.spinner-sub')[0].disabled=true;
		}
		
		//加号！！！！！！！
		_this.find('.spinner-add').unbind().bind('click',function(){
			var _button = $(this);
			var _thisVal = $(this).parent().children('.txt-spinner').val();
			var _thisId = $(this).parent().children('.txt-spinner').attr('id');
			var _val = Number(_thisVal) + 1;
			$(this)[0].disabled = true;
		    
			_getServerPro (_userID, _thisId, _val, _button);
		})

		//减号！！！！！！！
		_this.find('.spinner-sub').unbind().bind('click',function(){
			var _button = $(this);
			var _thisVal = $(this).parent().children('.txt-spinner').val();
			var _thisId = $(this).parent().children('.txt-spinner').attr('id');
			var _val = Number(_thisVal) - 1;
			$(this)[0].disabled=true;
			if (_val > 0){
				_getServerPro (_userID, _thisId, _val, _button);
			}else{
				//先调用弹出层，确定后，ajax
				if (_page == 'shoppingcart'){
	    			$('#myModal').modal();
					$('.del-close').click(function() {
						_button[0].disabled=false;
					});
					$('.del-sure').unbind().bind('click',function() {

					    _getServerDel(_userID, _thisId, _val, _button);


					    var productIds = "";
					    $('input[name="item"]:checked');

					    $("input[name='item']:checkbox:checked").each(function () {
					        productIds += $(this).val() + ",";
					    })

					    productIds = productIds.substring(0, productIds.length - 1);
					    if (productIds == '') {
					        $('.ShoppingCart-wrapper').addClass('null');
					      $('.submitList').remove(); //移除全选
                        }


					});
	    		}else{
	    			_getServerDel (_userID, _thisId, _val, _button);
	    		}
				
				//_getServerDel (_userID, _thisId, _val, _button);
			}
			
		})
	})
}

//ajax
function _getServerPro (UserId, ProductId, ProNum, button){
	$.ajax({
	    url: '/weixinstore/Interface/PurchaseCartSvc.aspx',
	    type: 'GET',
	    dataType: 'json',
	    data: 'method=AddProduct&UserId=' + UserId + '&ProductId=' + ProductId + '&Number=' + ProNum,
		async: false,
		success: function(data){
	    	if(data.status == 'true'){
	    		if (button.attr('class').indexOf('add') >= 0){
	    			var _thisProductVal = button.parent().children('.txt-spinner');
	    			_thisProductVal.val(Number(_thisProductVal.val()) + 1);
	    			button.parent().children('.spinner-sub')[0].disabled=false; //大于0时，减号可点击。
	    		}else{
	    			var _thisProductVal = button.parent().children('.txt-spinner');
	    			_thisProductVal.val(Number(_thisProductVal.val()) - 1);
	    		}
	    		
	    		setTimeout(function(){
	    			button[0].disabled=false; 
	    		},200);

	    		if ($('.checkWrap').length > 0){
	    			totalCount();
	    		}else{
	    			$('.total-price').html(data.price);
	    			$('.proNumber-0').html(data.count);

	    		    if ($('.shopping-cart span').length > 0) {
	    		        $('.shopping-cart span').show();
	    		    }
	    		}

	    		if (_page == 'product' || _page == 'index' || _page == 'shoppingcart'){
	    			if (data.count != 0){
	    				$('.proNumber-1').html(data.count);
	    				$('.proNumber-1').show();
	    			}else{
	                      $('.proNumber-1').hide();

	                    if ($('.shopping-cart span').length > 0) {
	                        $('.shopping-cart span').hide();
	                    }
	    			}
	    		}
	    		//$('#' + ProductId )[0].disabled=false; 
	    	}
		},
		error:function(){
			button[0].disabled=false;
		    alert('连接超时，请检查网络');
		}
	})
}

//ajax 删除
function _getServerDel (UserId, ProductId, ProNum, button){
	$.ajax({
	    url: '/weixinstore/Interface/PurchaseCartSvc.aspx',
	    type: 'GET',
	    dataType: 'json',
	    data: 'method=DeleteProduct&UserId=' + UserId + '&ProductId=' + ProductId,
		async: false,
		success: function(data){
	    	if(data.status == 'true'){
	    		var _thisProductVal = button.parent().children('.txt-spinner');
	    		_thisProductVal.val(Number(_thisProductVal.val()) - 1);
	    		
	    		button[0].disabled=true; 

	    		if ($('.checkWrap').length > 0){
	    			totalCount()
	   } else {
	       $('.total-price').html(data.price);
	       $('.proNumber-0').html(data.count);
	   }
	    		if (_page == 'shoppingcart'){
	    			button.parent().parent().parent().remove();
	    			checkAllFunc();
	    			myScroll.refresh();//重置iscroll
	    		}

	    		if (_page == 'product' || _page == 'index' || _page == 'shoppingcart'){
				 
	    			if (data.count != 0){
	    				$('.proNumber-1').html(data.count);
	    				$('.proNumber-1').show();


	    				if ($('.shopping-cart span').length > 0) {
	    				    $('.shopping-cart span').show();
	    				}
	    			}else{
	                    $('.proNumber-1').hide();


	                    if ($('.shopping-cart span').length > 0) {
	                        $('.shopping-cart span').hide();
	                    }
	    			}
	    		}
	    	}
		},
		error:function(){
			button[0].disabled=false; 
			alert('连接超时，请检查网络')
		}
	})
}

