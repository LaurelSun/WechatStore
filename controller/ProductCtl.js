/**
 * Created by Laurel Sun on 29/10/2015.
 */
var Product=require('../common/dbModels/Product');
var ProdcutService=Product.ProductService;

function ProductCtl(){}

ProductCtl.prototype.addProduct=function(req,res,next){
    console.log(req.body.rdoStats);
    res.result(true,'',req.Product);

};

ProductCtl.prototype.updateProduct=function(req,res,next){

}
module.exports=ProductCtl;