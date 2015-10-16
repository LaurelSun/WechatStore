/**
 * Created by Laurel Sun on 16/10/2015.
 */
var util=require('util');
module.exports=Packager;

function Packager(packageName,packageType){

    return function(req,res,next){
        var data=req.method.toUpperCase()=="POST"?req.body:req.query;

        if(typeof(packageType)!="function"){
            next();
            return;
        }
        var packageObj=new packageType();
        var info='';

        for(var i in data){

            /*
            * 5
            * true
            * "abc"
            * {"abc":"123"}
            * {"abc"：{"key":"value","key2":"value2"}}
            * [1,2,3,4]
            * [{"key":"value"},{"key":"value"}]
            *
            * */
            console.log('key:'+i+' value:'+data[i]);

            console.log(typeof(data[i]));

           var str= util.format("key:%s value: %s type:%s",i,data[i],typeof(data[i]))
            console.log(str);

            info+=str+'<br>';


           // if(packageObj[i]===undefined)
        }

        res.send(info);

    }

}