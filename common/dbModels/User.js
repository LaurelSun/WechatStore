/**
 * Created by Laurel Sun on 15/10/2015.
 */
var mongoHelper=require('./mongoose');

function User(name,password,status,createDate,isAdmin){
    this.name=name;
    this.password=password;
    this.status=status;
    this.createDate=createDate;
    this.isAdmin=isAdmin;

    this.schema={
        name:{type:String,require:true},
        password:{type:String,require:true},
        status:{type:Number,require:true,Default:0},
        createDate:{type:Date,require:true},
        isAdmin:{type:Boolean,require:true}
    }

}

var UserHelper=new mongoHelper("User",User);
UserHelper.bindStatic('changeStatus',function(id,status){
    UserHelper.model.update({_id:id})
});