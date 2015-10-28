/**
 * Created by Laurel Sun on 14/10/2015.
 */

var conf={
    port:9000,
    debug:true,
    db:"mongodb://127.0.0.1:27017/WechatStore",
    session_secret:"l.sun054",
    page_cnt:2,
    temp_path:'C:\\work\\nodejs\\temppath',
    upload_path:'c:\\work\\nodejs\\upload',
    img_resize:[{w:100,h:100},{w:640, h:260}]
};
module.exports=conf;