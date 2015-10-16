/**
 * Created by Laurel Sun on 14/10/2015.
 */
var express=require('express');
var router=express.Router();
var auth=require('../common/middlewares/validateAuth');

var adminCategory=require('./adminCategoryRouter');

router.get('/',function(req,res,next){
    res.render('index');
});

//router.use('/admin',auth.adminRequire);

router.use('/admin/category',adminCategory)






module.exports=router;