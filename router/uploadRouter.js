/**
 * Created by Laurel Sun on 23/10/2015.
 */
var express=require('express');
var conf=require('../conf');
var multer=require('multer');
var fs=require('fs');
var path=require('path');
var gm=require('gm').subClass({ imageMagick: true });


var router=express.Router();
var upload = multer({ dest: conf.temp_path });


router.post('/productImg',upload.single('product'),function(req,res,next){
    var file=req.file;
    if(!file){
        res.result(false,"file not exists.");
    }

    if(file.mimetype.indexOf('image')!=0){
        res.result(false,"unacceptable file type.");
    }

   // conf.img_resize

    //{ fieldname: 'product',
    //    originalname: 'Koala.jpg',
    //    encoding: '7bit',
    //    mimetype: 'image/jpeg',
    //    destination: '/upload/',
    //    filename: '844f87c3a1f8f2f082f75e1ae6013db5',
    //    path: '\\upload\\844f87c3a1f8f2f082f75e1ae6013db5',
    //    size: 780831 }
    //
    var extname=path.extname(file.originalname);

    var thumbnailPath=path.join(conf.upload_path, file.filename+'_s'+extname);
    var viewPath=path.join(conf.upload_path, file.filename+'_md'+extname);
    gm(file.path).resize(100,100,"!").write(thumbnailPath,function(err){
        if(err){
            next(err);
        }

        gm(file.path).resize(640,260,"!").write(viewPath,function(err){
                if(err){
                    next(err);
                }

            fs.unlink(file.path);
            res.result(true,'success',{url:'/upload/'+path.basename(thumbnailPath)})
        })


    });





    });


module.exports=router;