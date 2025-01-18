using financas_dominio.IdEntidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_dominio.Entidade
{
    public class TipoPagamento : EntidadeBase
    {
        public int IdTipoPagamento { get; set; }
        public string Descricao { get; set; }
        public int IdCartao { get; set; }
        public Cartao Cartao { get; set; }

    }
}
