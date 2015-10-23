/**
 * Created by Laurel Sun on 23/10/2015.
 */
var express=require('express');
var conf=require('../conf');
var multer=require('multer');

var router=express.Router();
var upload = multer({ dest: conf.upload_path });


router.post('/productImg',upload.single('product'),function(req,res,next){
        console.log( req.file)

    });

module.exports=router;