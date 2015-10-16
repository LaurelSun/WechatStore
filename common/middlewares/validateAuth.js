/**
 * Created by Laurel Sun on 15/10/2015.
 */

exports.adminRequire=function(req,res,next){

    if(req.url.indexOf('login')>=0){
        next();
    }

    var user=req.session.admin;
    if(!user||!user.isAdmin) {

        res.result(false, "请先登录");
        return;
    }
    next();
}