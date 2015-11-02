/**
 * Created by Laurel Sun on 15/10/2015.
 */
var moment=require('moment');

exports.responseResult=function(req,res,next){

    res.result=function(result,msg,data){
        var obj={};
        obj.result=result;
        obj.msg=msg;
        obj.data=data;
        res.send(JSON.stringify(obj))
    };

    next();

};

exports.renderPager=function(req,res,next){
    //[     {  "num": 1,   “key”: 10    },   {    "num": 1,    “key”: 10 }，{    "num": 1,   “key”: 10   }  ]
    //起始页面 页面数量 数据条数 标识字段 数据数组
    res.renderPager=function(startPage,pageCount,pageSize,fieldName,data){

    var pageArr=[];
        if(!data||data.length<1)return pageArr;
        for(var i=startPage;i<startPage+pageCount;i++){

            var index=(i*pageSize)+1;
            if(index>data.length){
                break;
            }

            var keyValue=new moment(data[index][fieldName]).format('YYYYMMDDHHmmssSSS');


            var page={num:i,key:keyValue };
            pageArr.push(page);
        }

        return pageArr;
    };
    next();
};