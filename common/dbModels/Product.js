/**
 * Created by Laurel Sun on 22/10/2015.
 */
var mongoHelper=require('./mongoose');

function Product(productName,productCode,productSummary,imgURL,
                 productIntro,productPutInDate,productPutOutDate,Status,
                 InventoryCount,InventoryInitCount,warnCount,inputDate,inputUserId,
                 modifyDate,modifyUserId
)
{
    this.id='';
    this.productName=productName;
    this.productCode=productCode;
    this.productSummary=productSummary;
    this.imgURL=imgURL;
    this.productIntro=productIntro;
    this.productPutInDate=productPutInDate;
    this.productPutOutDate=productPutOutDate;
    this.status=Status;
    this.InventoryCount=InventoryCount;
    this.InventoryInitCount=InventoryInitCount;
    this.warnCount=warnCount;
    this.inputDate=inputDate;
    this.inputUserId=inputUserId;
    this.modifyDate=modifyDate;
    this.modifyUserId=modifyUserId;

    this.schema={
        productName:{type:String},
        productCode:{type:String},
        productSummary:{type:String},
        imgURL:{type:Array},
        productIntro:{type:String},
        productPutInDate:{type:Date},
        productPutOutDate:{type:Date},
        status:{type:Number},
        InventoryCount:{type:Number},
        InventoryInitCount:{type:Number},
        warnCount:{type:Number},
        inputDate:{type:Date},
        inputUserId:{type:String},
        modifyDate:{type:Date},
        modifyUserId:{type:String}
    }
}


var ProductHelper=new mongoHelper('product',Product);
ProductHelper.bindModel();
module.exports=Product;
module.exports.ProductService=ProductHelper;

