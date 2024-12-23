using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_dominio.IdEntidade
{
    public class EntidadeBase
    {
        public Guid Id { get; set; }

        public bool Deletado { get; set; }
    }
}
