/**
 * Created by Laurel Sun on 14/10/2015.
 */
var mongoose=require('mongoose');
var conf=require('../conf');
var Schema=mongoose.Schema;
var db=mongoose.createConnection(conf.db);

function mongooseHelper(collectionName,obj){
    this.schema= new Schema(obj);
    this.model=db.model(collectionName,this.schema);
    this.collectionName=collectionName;
}

mongooseHelper.prototype.bindStatic=function(fnName,fn){
    return function(){
        this.schema.statics[fnName]=fn;
    }

};

mongooseHelper.prototype.bindMethod=function(fnName,fn){
    return function(){
        this.schema.methods[fnName]=fn;
    }
};

mongooseHelper.prototype.findOne=function(id,callback){
     this.model.find({_id:id},function(err,data){
         callback(err,data);
     });
};

mongooseHelper.prototype.save=function(obj){
    this.model.create(obj);
};



module.exports=mongooseHelper;