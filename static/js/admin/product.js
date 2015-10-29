/**
 * Created by Laurel Sun on 26/10/2015.
 */

function product()
{
    this.um= UM.getEditor('myEditor');
    this.uploadUrl='/admin/upload/productImg';

    this.productName=$('.productName');
    this.productCode=$('.productCode');
    //this.productSummary=$('.productSummary');
    this.productImage=$('.thumbnail');
    this.productCategory=$('.productCategory');

    //this.productPutInDate=$('.productPutInDate');
    //this.productPutOutDate=$('.productPutOutDate');

    this.invetoryStatus=$('.rdoStats');
    this.invetoryInitialCount=$('.initialCount');
    this.inventoryCount=$('.inventoryCount');
    this.inventoryWarnCount=$('.inventoryWarnCount');



    this.warningAlert=$('.alert-danger');

}
product.prototype.init=function(){
    this.warningAlert.hide();
    $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd hh:00',autoclose:1,minView:1,startDate:new Date()});

    this.bind();
};
product.prototype.bind=function(){

    $('.nav-tabs').on('click','li',function(){
        var $this=$(this);
        var tabIndex=$this.index();
        $('li',  $('.nav-tabs')).removeClass('active').eq(tabIndex).addClass('active');
        $('.tab-page').addClass('hidden').eq(tabIndex).removeClass('hidden')
    });

    var $product=this;

    $('.thumbnail').on('change','#product', function(){
        $product.upload(function(imgSrc){
            var product=$('#product');
            var parent=product.parent('.thumbnail');
            product.val('');

            var htmlStr='    <a href="#" class="thumbnail col-md-1">'+
                '<img src="' +imgSrc+'"  > <i>X</i>  </a>';

            parent.before(htmlStr);
        })
    });

    $('.btnSave').on('click',function(){

        var content=$product.um.getContent();
        content.replace('<','[').replace('>',']');
       if(! $product.validate()){
           return false;
       }
    });

    $('.dropdown-menu').on('click','a',function(){
        $(this).parents('.dropdown').find('.tag').text(this.innerHTML);
        $(this).parents('.col-sm-5').find('input').val(this.innerHTML);

    });

    $('.category').on('click','a',function(){
        var $this=$(this);
        var status=$this.attr('status')=='0'?true:false;


        $product.inventoryCount.val('').attr('readonly',status);
        $product.inventoryWarnCount.val('').attr('readonly',status);
        $product.invetoryInitialCount.val('').attr('readonly',status);
        $product.invetoryStatus.attr('checked',!status);
    })

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
};

product.prototype.validate=function(){



    this.clear();
    var reg=new RegExp('^(\\w+\\s?)+$');

    if(!reg.test(this.productName.val())){
        this.productName.parent().addClass('has-error');
        return false;
    }

    if(!reg.test(this.productCategory.val())){
        this.productCategory.parent().addClass('has-error');
        return false;
    }

    reg=new RegExp('^[a-zA-Z0-9]{5}$');
    if(!reg.test(this.productCode.val())){
        this.productCode.parent().addClass('has-error');
        return false;
    }

    this.productImage=$('.thumbnail');
    if(this.productImage.length<2||this.productImage.length>6){
        this.warningAlert.show();
        return false;
    }

    if(this.invetoryStatus.is(':checked')){

        var changeTab=false;

        if(Number.isNaN(parseInt(this.inventoryCount.val())) ){
            this.inventoryCount.parent().addClass('has-error');
            changeTab= true;
        }

        if(Number.isNaN(parseInt(this.inventoryWarnCount.val()))  ){
            this.inventoryWarnCount.parent().addClass('has-error');
            changeTab= true;
        }

        if(Number.isNaN(parseInt(this.invetoryInitialCount.val()))){
            this.invetoryInitialCount.parent().addClass('has-error');
            changeTab= true;
        }

        if(changeTab){
            var tabIndex=1;
            $('li',  $('.nav-tabs')).removeClass('active').eq(tabIndex).addClass('active');
            $('.tab-page').addClass('hidden').eq(tabIndex).removeClass('hidden')
            return !changeTab;
        }
    }

    return true;


};

product.prototype.clear=function(){
    this.invetoryInitialCount.parent().removeClass('has-error');
    this.inventoryCount.parent().removeClass('has-error');
    this.inventoryWarnCount.parent().removeClass('has-error');
    this.productCategory.parent().removeClass('has-error');
    this.productName.parent().removeClass('has-error');
    this.productCode.parent().removeClass('has-error');
    this.warningAlert.hide();
}