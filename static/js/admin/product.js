/**
 * Created by Laurel Sun on 26/10/2015.
 */

function product()
{
    this.um= UM.getEditor('myEditor');
    this.uploadUrl='/admin/upload/productImg';

}
product.prototype.init=function(){

    $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd hh:00',autoclose:1,minView:1});

    $('.nav-tabs').on('click','li',function(){
        var $this=$(this);

        var tabIndex=$this.index();

        $('li',  $('.nav-tabs')).removeClass('active').eq(tabIndex).addClass('active');

        $('.tab-page').addClass('hidden').eq(tabIndex).removeClass('hidden')
    });
    var $product=this;

    $('.thumbnail').on('change','#product',function(){

        $product.upload(function(imgSrc){

            var product=$('#product');
            var parent=product.parent('.thumbnail');
            product.val('');

           var htmlStr='    <a href="#" class="thumbnail col-md-1">'+
               '<img src="' +imgSrc+'"  > <i>X</i>  </a>';

            parent.before(htmlStr);


        });
    });

 


};
product.prototype.upload=function(cb){


    $.ajaxFileUpload({
        url: this.uploadUrl,
        secureuri: false,
        data: null,
        fileElementId: 'product',
        dataType: 'json',
        success: function (data) {
            if(data.result&& cb){
                cb(data.data.url);
            }
            else{
                alert(data.msg);
            }

        },
        error: function (data) {
            alert("error");
        }
    });
}

