using financas_dominio.IdEntidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_dominio.Entidade
{
    public class Cartao : EntidadeBase
    {

        public int IdCartao { get; set; }
        public string NomeTitular { get; set; }
        public string NomeDependente { get; set; }
        public string Bandeira { get; set; }
        public decimal Limite { get; set; }
        public string Numero { get; set; }
        public string CpfTitular { get; set; }

    }
}
