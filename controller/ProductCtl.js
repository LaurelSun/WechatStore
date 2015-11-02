/**
 * Created by Laurel Sun on 29/10/2015.
 */
var Product=require('../common/dbModels/Product');
var string=require('../common/tools/string');
var conf=require('../conf.js');
var moment=require('moment');
var async=require('async');


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

    var pageValue=req.query.pageValue;  //当前页最后一条记录时间戳
    var renderPage=req.query.renderPage;//请求中包含加载(0:前N页,1后N页)
    var currentPage=req.query.cur;//当前页
    currentPage=new RegExp('^[1-9]\\d*$').test(currentPage)?parseInt(currentPage):0;

    var queryKey=req.query.key; //search 查询字段productCode productName

    var isCorrect=moment(pageValue,"YYYYMMDDHHmmss").isValid();
    var formatStr='YYYY-MM-DD HH:mm:ss:SSS';
    var createDate=(isCorrect?moment(pageValue,formatStr).toISOString()
        :moment('1900-01-01 00:00:00',formatStr).toISOString());


    //存在pageValue 使用gt 进行查询
    var filter=renderPage=="0"?{"$lt":new Date(createDate)}:{"$gt":new Date(createDate)};
    var queryOpt={softField:{inputDate:1},pageSize:conf.pager_querySize,
        filter:'_id productName productCode productPutInDate productPutOutDate inputDate'};
    ProdcutService.Query({'inputDate':filter},queryOpt,function(err,data){
        if(err){
            console.log(err);
            next();
            return;
        }

        var productArr=[];
        for(var i=0;i<conf.page_cnt;i++){
            productArr.push(data[i]);
        }

        var pager=res.renderPager(currentPage,conf.pager_renderCnt,conf.page_cnt,'inputDate',data);

        res.result(true,'',{pager:pager,arr:productArr});
    });
 
};

module.exports=ProductCtl;