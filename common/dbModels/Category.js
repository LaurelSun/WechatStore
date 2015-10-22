/**
 * Created by Laurel Sun on 14/10/2015.
 */
var mongoHelper=require('./mongoose');

function Category(name,enable,createDate,parentId){
    this.id='';
    this.name=name;
    this.enable=enable;
    this.createDate=createDate;
    this.parentId=parentId;

    this.schema= {
        name: {type: String, required: true},
        enable: {type: Boolean},
        createDate:{type:Date},
        parentId:{type:String}
    }
}
var CategoryHelper=new mongoHelper("category",Category);

CategoryHelper.bindStatic('exist',function(categoryName,callback){
    CategoryHelper.model.find({categoryName:categoryName}).count().exec(function(err,data){
        callback(err,data);
   })
});


CategoryHelper.bindModel();
module.exports=Category;
module.exports.CategoryService=CategoryHelper;