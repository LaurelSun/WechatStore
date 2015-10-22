/**
 * Created by Laurel Sun on 14/10/2015.
 */

var express=require('express');
var app=new express();
var router=require('./router/WebRouter');
var conf=require('./conf');
var session=require('express-session');
var responseTool=require('./common/middlewares/render');
var bodyParser=require('body-parser');

//设置渲染引擎与页面目录
app.engine('.html',require('ejs').__express);
app.set('view engine','html');
app.set('views',__dirname+'/views');

//设置静态文件目录
app.use(express.static(__dirname+'/static'));

//绑定中间件
app.use(session({
    secret:conf.session_secret,
    resave:true,
    cookie:{secure:false},
    saveUninitialized:false
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(responseTool.responseResult);

//绑定路由
app.use('/',router);

//错误处理器
if(conf.debug){
    app.use(function(err,req,res,next){
        console.log(err);
        res.send(err);
    });
}
else{
    app.use(function(err,req,res,next){
        res.statusCode(500);
        res.send('server error');
    });
}


//监听端口
app.listen(conf.port);