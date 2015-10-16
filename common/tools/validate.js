/**
 * Created by Laurel Sun on 15/10/2015.
 */

/**
 * Created by Laurel Sun on 21/08/2015.
 */
/*
 * validate data
 * app.use('/url',Validate({type:[form],[url]
 *           list:[
 *                  {"key":"name","regex":"^\w+$","msg":"请输入用户名"},
 *                  {"key":"age","range":"10-20","msg":"范围在10-20中间"},
 *                  {"key":"email","require":true,"msg":"请输入email"},
 *                  {"key":"password","require":true,"regex":"^\w{10,30}$","msg":["请输入密码","密码长度为10-30位"]}
 *               ]
 *               })
 *         );
 * */
module.exports=function(options){

    return function(req,res,next){

        var validate=new ValidateData(options);
        var validateType=validate.option.type.toLowerCase();
        //数据来源仅支持form表单和url参数列表
        if(validateType!='form'&&validateType!="url"){
            console.log('validateType error');
            res.send();
        }

        var data=new Array();

        var collection=validateType=="form"?req.body:req.query;
        //绑定数据源
        for(var i in collection){
            data.push(new Element(i,collection[i]));
        }

        var result=validate.valiateRule(data);

        //当所有字段都验证通过后进行后续处理
        if(result.result){
            next();
        }
        else{
            res.json(result);
        }
    }
};

function ValidateData(options){
    this.option={
        type:options.type||'',
        list:options.list||[]
    };
    this.ruleIndex={}; //验证规则索引
    this.msgLevel={require:0,range:1,regex:2};  //输出消息的索引

    this.initialRuleIndex(this.option.list);
}
/*
 * 根据提供的验证规则绑定至ruleIndex作为索引查询
 * ruleIndex中存储格式为 ruleIndex={name：index，name：index}；
 * */
ValidateData.prototype.initialRuleIndex=function(roleList){

    for(var i=0;i<roleList.length;i++ ){
        var key=roleList[i].key;

        if(this.ruleIndex[key]===undefined){
            this.ruleIndex[key]=i;

        }
    }
};

/*
 * data:[{name:"name",value:"123"},...]
 */
ValidateData.prototype.valiateRule=function(data){

    if(data.length==0||data.length<this.option.list.length){
        return new ValidateResult(false,"data not exists");
    }
    for(var i=0;i<data.length;i++){
        //判断提供的ruleIndex中是否存在要验证的字段
        if(this.ruleIndex[data[i].name]>=0){
            var res=this.validate(data[i],this.ruleIndex[data[i].name]);
            if(!res.result){
                return res;
            }
        }
    }


    return new ValidateResult(true,'');

};

ValidateData.prototype.validate=function(data,ruleIndex){
    //1 require 2 range 3 regex
    var r=new Rule(this.option.list[ruleIndex]);
    var val=data.value;
    var reg;

    if(r.require!=null){
        if(val.trim().length>0!=r.require){

            return new ValidateResult(false, this.getMsg(this.msgLevel.require,r.msg));
        }
    }

    if(r.range!=null){

        if(isNaN(val)){
            return  new ValidateResult(false,"datatype error")
        }

        reg=new RegExp(/^(\d+)-(\d+)$/);
        var min= 0,max=0;
        if(reg.test(r.range)){
            r.range.replace(reg,function(all,item2,item3){
                max=Math.max(item2,item3);
                min=Math.min(item2,item3);

            });

        }else{
            return new ValidateResult(false,"range error");
        }

        if(val<min|| val>max){
            return new ValidateResult(false,this.getMsg(this.msgLevel.range, r.msg));
        }

    }

    if(r.regex!=null){

        reg=new RegExp(r.regex);

        if(!reg.test(val)){
            return new ValidateResult(false,this.getMsg(this.msgLevel.regex, r.msg));
        }
    }

    return new ValidateResult(true,'');
};


ValidateData.prototype.getMsg=function(level,msgArr){

    var arr=new Array();
    var msg='';

    if(msgArr.constructor!=Array){

        arr.push(msgArr);
    }
    else{
        arr=msgArr;
    }

    for(var i=level;i>=0;i--){
        if(arr[i]!=undefined){
            return arr[i];
        }
    }
    return msg;

};


//validate model
function Rule(ele){
    this.key=ele.key||'';
    this.regex=ele.regex||null;
    this.msg=ele.msg||this.key;
    this.require=ele.require||null;
    this.range=ele.range||null;
}
function ValidateResult(result,msg){
    this.msg=msg;
    this.result=result;
}
function Element(name,value){
    this.name=name;
    this.value=value;
}