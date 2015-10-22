/**
 * Created by Laurel Sun on 15/10/2015.
 */

var User=require('../dbModels/User');
var UserService=User.UserService;

exports.adminRequire=function(req,res,next){

    if(req.url.indexOf('login')>=0){
        next();
      return;
    }

    var user=req.session.admin;
    if(!user||!user.isAdmin) {
        res.redirect('/admin/login');

        return;
    }
    next();
};

exports.login=function(req,res,next){

    res.render('admin/login.html');
}

exports.processLogin=function(req,res,next){
   // req.User.username

    UserService.model.findUserByName(req.User.name,req.User.password,function(err,data){

        if(err){
            next(err);
            return;
        }
        if(data.length<1){
            res.result(false,"user not exists");
        }
        else{
            req.session.admin=data[0];
            res.redirect('/admin/index')
        }
        

    })


};


exports.logout=function(req,res){
    req.session.admin=null;
}