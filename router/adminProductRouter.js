/**
 * Created by Laurel Sun on 22/10/2015.
 */
var express=require('express');
var router=express.Router();

router.get('/addProduct',function(req,res,next){
   res.render('admin/addProduct.html')
});

module.exports=router;