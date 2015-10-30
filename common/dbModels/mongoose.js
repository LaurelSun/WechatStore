/**
 * Created by Laurel Sun on 14/10/2015.
 */
var mongoose=require('mongoose');
var conf=require('../../conf');
var Schema=mongoose.Schema;
var db=mongoose.createConnection(conf.db);

function mongooseHelper(collectionName,obj,opt){
    opt=opt?opt:{};
    var option={
        safe:opt.safe||false,
        autoIndex:opt.autoIndex||true,
        validateBeforeSave:opt.validateBeforeSave||true,
        versionKey:opt.versionKey||false
    };

    var objSchema=new obj().schema;
    this.schema= new Schema(objSchema,option);
    this.model=null;
    this.collectionName=collectionName;
}

mongooseHelper.prototype.bindStatic=function(fnName,fn){

        this.schema.statics[fnName]=fn;


};

mongooseHelper.prototype.bindMethod=function(fnName,fn){

        this.schema.methods[fnName]=fn;

};

mongooseHelper.prototype.bindModel=function(){
    this.model=db.model(this.collectionName,this.schema);
};

mongooseHelper.prototype.Query=function(query,opt,callback){

    var option={};
    if(typeof(opt)==="function"){
        callback=opt;
        opt={};
    }
    option.pageSize=opt.pageSize;
    option.sortField=opt.sortField||{_id:1};

    query=query||{};
    var $this=this;
    if(option.pageSize){
        //分页query会传出  totalPage totalCnt

        this.model.find(query).count().exec(function(err,data){
            if(err){
                callback(err,{});
                return;
            }

            var totalCnt=data;
            var totalPage=Math.ceil(parseFloat(totalCnt/parseInt(conf.page_cnt)));

            $this.model.find(query).sort(option.sortField).limit(option.pageSize).exec(function(err,data){
                if(err){
                    callback(err,{});
                    return;
                }

                callback(err,data,{totalPage:totalPage,totalCnt:totalCnt});
            });
        });
    }
    else{

        $this.model.find(query).sort(option.sortField).exec(function(err,data){
            callback(err,data);
        });
    }

};

mongooseHelper.prototype.findOne=function(id,callback){
     this.model.find({_id:id},function(err,data){
         if(err)callback(err,null);

         callback(err,data[0]);
     });
};

/**
 *@param {object}  object data model
 *@param {function} callback
 *
 */
mongooseHelper.prototype.save=function(obj,callback){

    if(obj.schema){
        delete obj.schema;
    }
    var jsonStr=JSON.stringify(obj);
    var jsonObj=eval('('+jsonStr+')');

    this.model.create(jsonObj,function(err,d){
        callback(err,d);
    });
};

mongooseHelper.prototype.count=function(query,callback){
    this.model.find(query).count().exec(callback);
};


module.exports=mongooseHelper;