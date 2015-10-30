/**
 * Created by Laurel Sun on 30/10/2015.
 */
module.exports.isNullOrEmpty=function(str){
    if(str.length==0)return true;
    if(str===null)return true;
    return false;
};

module.exports.empty=function(){
    return "";
};

module.exports.trim=function(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
};

