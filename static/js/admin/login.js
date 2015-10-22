/**
 * Created by Laurel Sun on 19/10/2015.
 */

$(function(){
   $('.btn').click(function(){
       var username=$('.txtName') ;
       var pwd=$('.txtPwd');

       var userParent= username.parent();
       var pwdParent=pwd.parent();

       userParent.removeClass("has-error");
       pwdParent.removeClass("has-error");

       if(username.val().trim().length<1){
           userParent.addClass('has-error');
           return false;
       }

       if(pwd.val().trim().length<1){
           pwdParent.addClass('has-error');
           return false;
       }

       $('form').submit();
   })
});