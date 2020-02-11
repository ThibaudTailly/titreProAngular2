using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Alimevo2.Services
{
    public class Database
    {
        public static readonly String strconn = "Data Source = localhost\\SQLEXPRESS; Initial Catalog = COOK_ALIMEVO; Integrated Security = true";
        public static SqlConnection GetConnexion()
        {
            return new SqlConnection(strconn);
        }
        
    }
}
