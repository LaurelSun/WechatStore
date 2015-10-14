using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CCWOnline.Management.Mall;
using CCWOnline.Management.Mall.Model;

namespace CCWOnline.Management.Web.weixinstore.inc
{
    public partial class Nav : System.Web.UI.UserControl
    {
        public CM_WeChatPublicAccount currentAccount { get; set; }

        protected void Page_Load(object sender, EventArgs e)
        {
            currentAccount = Session["currentAccount"] as CM_WeChatPublicAccount;
            


        }

        protected string AppendAppIdParameter()
        {
            string id = currentAccount==null?string.Empty:currentAccount.Appid;
            return string.IsNullOrEmpty(id) ? "" : "?aid=" +Encryption.Encrypt(id);

        }
    }
}