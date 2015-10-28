/**
 * Created by Laurel Sun on 14/10/2015.
 */
var express=require('express');
var router=express.Router();

var auth=require('../common/middlewares/validateAuth');
var Packager=require('../common/tools/Packager');
var adminCategory=require('./adminCategoryRouter');
var adminProduct=require('./adminProductRouter');
var uploadRouter=require('./uploadRouter');
var User=require('../common/dbModels/User');

router.get('/',function(req,res,next){
    res.render('index');
});


//router.use('/admin',auth.adminRequire);
router.get('/admin/login',auth.login);
router.post('/admin/login',Packager(User),auth.processLogin);
router.get('/admin/index',function(req,res,next){
    res.render('admin/index');
});


router.use('/admin/category',adminCategory);

router.use('/admin/product',adminProduct);

router.use('/admin/upload',uploadRouter);

module.exports=router;