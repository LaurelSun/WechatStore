<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Nav.ascx.cs" Inherits="CCWOnline.Management.Web.weixinstore.inc.Nav" %>
<div class="navbar">
	<ul>
	    <li><a href="/weixinstore/Default.aspx<%=AppendAppIdParameter() %>" class="backmark"><span>首页</span></a></li>
		<li><a href="/weixinstore/Index.aspx<%=AppendAppIdParameter() %>" class="backmark"><span>全部产品</span></a></li>
        
		<li><a href="/weixinstore/ShoppingCart.aspx<%=AppendAppIdParameter() %>"class="backmark"><span>购物车<b class="proNumber-1">1</b></span></a></li>
		<li><a href="/weixinstore/PersonalCenter.aspx<%=AppendAppIdParameter() %>"class="backmark"><span>会员中心</span></a></li>
	</ul>
</div>