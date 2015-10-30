/**
 * Created by Laurel Sun on 29/10/2015.
 */
var Product=require('../common/dbModels/Product');
var string=require('../common/tools/string');
var moment=require('moment');


var ProdcutService=Product.ProductService;

function ProductCtl(){}

ProductCtl.prototype.addProduct=function(req,res,next){
    var productInfo=req.Product;

    if( !string.isNullOrEmpty(productInfo.productPutInDate)||
        !string.isNullOrEmpty(productInfo.productPutOutDate)
    ){
        var putInDate=moment(productInfo.productPutInDate);
        var putOutDate=moment(productInfo.productPutOutDate);

        if(putInDate.diff(putOutDate)>=0){
            res.result(false,'putOutDate earlier than putInDate');
        }
    }


    if(req.body.rdoStats){
        var numberRegExp=new RegExp('^[1-9]\\d*$');

        if(!numberRegExp.test(productInfo.InventoryCount)||
            !numberRegExp.test(productInfo.InventoryInitCount)||
            !numberRegExp.test(productInfo.warnCount))
        {
            res.result(false,'inventory settings must a number.');
            res.result(false,'inventory settings must a number.');
            return false;
        }
        productInfo.status=1;
        //initial count lower than inventory count
        if(productInfo.InventoryCount<productInfo.InitCount){
            res.result(false,'init Count lower than inventory count');
            return false;
        }
    }
    else{
        productInfo.status=0;
    }
    //split image url
    productInfo.imgURL= req.body.imgURL.split('^_^',5);
    productInfo.modifyDate=productInfo.inputDate=new Date();
    productInfo.modifyUserId= productInfo.inputUserId=  '1111';


    ProdcutService.save(productInfo,function(err,data){
        if(err){
            next(err);
        }
        res.redirect('/admin/product/');

    });
};

ProductCtl.prototype.updateProduct=function(req,res,next){

};

ProductCtl.prototype.list=function(req,res,next){

    res.render('admin/product.html');
};

module.exports=ProductCtl;