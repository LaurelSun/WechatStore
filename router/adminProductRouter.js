/**
 * Created by Laurel Sun on 22/10/2015.
 */
var express=require('express');
var validate=require('../common/tools/validate');
var packager=require('../common/tools/packager');
var Product=require('../common/dbModels/Product')
var ProductCtl=require('../controller/productCtl');
var router=express.Router();

var productCtr=new ProductCtl();

router.get('/addProduct',function(req,res,next){
   res.render('admin/addProduct.html')
});

router.post('/add',validate({type:"form",
   list:[
      {key:"productName",regex:"^(\\w+\\s?)+$",msg:"productName is require"},
      {key:"productCode",regex:"^[a-zA-Z0-9]{5}$",msg:" letter and number are allow"},
      {key:"productCategory",regex:"^(\\w+\\s?)+$",msg:"productCategory is require"},
      {key:"thumbnail",regex:"^.$",msg:"productImage is require"}
   ]}),packager(Product),productCtr.addProduct);


module.exports=router;