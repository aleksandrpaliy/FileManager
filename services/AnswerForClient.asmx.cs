using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using WebApplication1.models;
using WebApplication1.Controllers;
using System.Web.Script.Serialization;

namespace WebApplication1.Services
{
    /// <summary>
    /// Сводное описание для AnswerForClient
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Чтобы разрешить вызывать веб-службу из скрипта с помощью ASP.NET AJAX, раскомментируйте следующую строку. 
    [System.Web.Script.Services.ScriptService]
    public class AnswerForClient : System.Web.Services.WebService
    {
        mainModel model = new mainModel();
        [WebMethod]
        public mainModel HelloWorld(string path)
        {
            // Редактировать код на новую модель DATA
            JavaScriptSerializer js = new JavaScriptSerializer();
            model = model.refresh_model(path);
            return model;
//            Context.Response.Write(js.Serialize(model.data));
            //            return str;
        }
    }
}
