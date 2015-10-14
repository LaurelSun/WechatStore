/**
 * Created by Laurel Sun on 14/10/2015.
 */
var express=require('express');
var router=express.Router();

router.get('/',function(req,res,next){
    res.render('index');
});



module.exports=router;