using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_negocios.Interface
{
    public interface IAuthService
    {
        string GeradorJwtToken(string email, string senha);
    }
}
