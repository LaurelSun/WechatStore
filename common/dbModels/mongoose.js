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
    option.pageSize=opt.pageSize;
    option.sortField=opt.sortField||{_id:1};

    query=query||{};

    if(option.pageSize){
        //分页query会传出  totalPage totalCnt
        var $this=this;
        this.model.find(query).count().exec(function(err,data){
            if(err){
                callback(err,{});
                return;
            }

            var totalCnt=data;
            var totalPage=Math.ceil(parseFloat(totalCnt/parseInt(conf.page_cnt)));
            console.log(JSON.stringify(query))
            console.log(option.sortField)
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
        this.model.find(query).sort(option.sortField).exec(callback);
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



module.exports=mongooseHelper;