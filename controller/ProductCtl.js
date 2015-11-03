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

    var pageValue=req.query.pageValue;  //��ǰҳ���һ����¼ʱ���
    var renderPage=req.query.renderPage;//�����а�������(0:ǰNҳ,1��Nҳ)
    var currentPage=req.query.cur;//��ǰҳ
    currentPage=new RegExp('^[1-9]\\d*$').test(currentPage)?parseInt(currentPage):0;

    var queryKey=req.query.key; //search ��ѯ�ֶ�productCode productName

    var isCorrect=moment(pageValue,"YYYYMMDDHHmmss").isValid();
    var formatStr='YYYY-MM-DD HH:mm:ss:SSS';
    var createDate=(isCorrect?moment(pageValue,formatStr).toISOString()
        :moment('1900-01-01 00:00:00',formatStr).toISOString());


    //����pageValue ʹ��gt ���в�ѯ
    var filter=renderPage=="0"?{"$lt":new Date(createDate)}:{"$gt":new Date(createDate)};
    var queryOpt={softField:{inputDate:1},pageSize:conf.pager_querySize,
        filter:'_id productName productCode productPutInDate productPutOutDate inputDate status'};

    var queryObj={};
    queryObj['$and']=[];
    queryObj['$and'].push({'inputDate':filter});

    if(queryKey){
        var searchObj={};
        searchObj['$or']=[];
        searchObj['$or'].push({productName:{$regex:queryKey}});
        searchObj['$or'].push({productCode:{$regex:queryKey}});

        queryObj['$and'].push(searchObj);

    }

    ProdcutService.Query(queryObj,queryOpt,function(err,data){
        if(err){
            console.log(err);
            next();
            return;
        }

        var pageCnt=data.length<conf.page_cnt?data.length:conf.page_cnt;

        var productArr=[];
        for(var i=0;i<pageCnt;i++) {

            data[i].putIn=data[i].productPutInDate?moment(data[i].productPutInDate).format('YYYY-MM-DD HH:mm:ss'):"N/A";
            data[i].putOut=data[i].productPutOutDate?moment(data[i].productPutOutDate).format('YYYY-MM-DD HH:mm:ss'):"N/A";

            productArr.push(data[i]);
        }
        var pager=res.renderPager(currentPage,conf.pager_renderCnt,conf.page_cnt,'inputDate',data);

        res.render('admin/product.html',{pager:pager,arr:productArr,cur:currentPage});
        //res.result(true,'',);
    });
};

module.exports=ProductCtl;