/**
 * Created by Laurel Sun on 15/10/2015.
 */

exports.responseResult=function(req,res,next){

    res.result=function(result,msg,data){
        var obj={};
        obj.result=result;
        obj.msg=msg;
        obj.data=data;
        res.send(JSON.stringify(obj))
    };

    next();

};
