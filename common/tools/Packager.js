/**
 * Created by Laurel Sun on 16/10/2015.
 */
module.exports=Packager;



function Packager(packageType){

    return function(req,res,next){
        var data=req.method.toUpperCase()=="POST"?req.body:req.query;

        if(typeof(packageType)!="function"){
            next();
            return;
        }
        var packageObj=new packageType(); //req 绑定对象
        var packageName=packageObj.__proto__.constructor.name;


        //请求过来后 首先获取每一个字段的值 new绑定的对象
        //遍历字段判定 对象是否有该字段
        //如果存在该字段 尝试进行json转换 转换成功 将object复制给该对象
        //转换失败 字符串给该对象


        for(var i in data){
            if(packageObj.hasOwnProperty(i)&&typeof (packageObj[i])!="function"){
                try{
                    packageObj[i] = JSON.parse(data[i])
                }catch(e){
                    packageObj[i]=data[i];
                }
            }

        }



        for(var attr in packageObj){
            if(packageObj[attr]===undefined){
                packageObj[attr]=''
            }
        }



        req[packageName]=packageObj;

        next();
    }

}