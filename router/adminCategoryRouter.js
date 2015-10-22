/**
 * Created by Laurel Sun on 15/10/2015.
 */
var express=require('express');
var router=express.Router();
var CategoryCtl=require('../controller/CategoryCtl');
var Category=require('../common/dbModels/Category');
var Validate=require('../common/tools/validate');
var Packager=require('../common/tools/Packager');


var ctrl=new CategoryCtl();

router.post('/',Packager(Category),ctrl.createCategory);

router.get('/list',Validate({type:'url',list:[{key:'pageValue',regex:"^\\w+$",msg:"lost page info"}]})
    ,ctrl.getCategoryList);

router.put('/list',Validate({type:'form',list:[{key:'id',regex:'^\\w{24}$',msg:'lost id'}]}),
    ctrl.setCategoryListStatus);

router.delete('/list',Validate());

module.exports=router;