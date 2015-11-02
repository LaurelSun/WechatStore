/**
 * Created by Laurel Sun on 15/10/2015.
 */
var async=require('async');
var moment=require('moment');
var Category=require('../common/dbModels/Category');
var CategoryService=Category.CategoryService;
var conf=require('../conf');
var assert=require('assert');

function CategoryCtl(){}

CategoryCtl.prototype={
    createCategory:function(req,res,next){

        var categoryName=req.Category.name;
          CategoryService.model.exist(categoryName,function(err,data){
              if(err)next(err);
              if(data<=0){
                  CategoryService.save(new Category(categoryName,true),function(err,data){
                      if(err)next(err);
                      res.result(true,"create success",data);
                  });
              }else{
                  next(categoryName+" has been created");
              }
          });

    },
    getCategoryList:function(req,res,next){

        var pageValue=req.query.pageValue;

        var isCorrect=moment(pageValue,"YYYYMMDDHHmmss").isValid();

        var formatStr="YYYY-MM-DD HH:mm:ss:SSS";

        var createDate=(isCorrect?moment(pageValue,formatStr).toISOString()
            :moment('1900-01-01 00:00:00',formatStr).toISOString());

        var showInfo=moment(pageValue,'YYYY').get('year')===1900?true:false;

        var queryOpt={sortField:{createDate:1},pageSize:conf.page_cnt};
        CategoryService.Query({'createDate':{'$gt':new Date(createDate)}},queryOpt,
            function(err,data,pageObj){

            if(err){
                console.log(err);
                next();
                return;
            }
            if(!showInfo){
                pageObj={}
            }


            res.result(true,"success",{list:data,pageInfo:pageObj});
        });
    },
    setCategoryListStatus:function(req,res,next){
        var categoryId=req.body.id;

        CategoryService.findOne(categoryId,function(err,data){
           assert.equal(err,null);

            CategoryService.model.update({_id:data.id},
                {'enable':!data.enable},function(err,data){
                    assert.equal(err,null);
                    console.log(data);
                    res.result(true,"success",data);
            });
        })
    },
    constructor:CategoryCtl
};

module.exports=CategoryCtl;
