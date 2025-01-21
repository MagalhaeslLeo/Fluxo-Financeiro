using financas_dominio.IdEntidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_dominio.Entidade
{
    public class FonteRenda : EntidadeBase
    {
        public int IdFonteRenda { get; set; }
        public string Descricao { get; set; }

        public ICollection<Receita> Receitas { get; set; }


    }
}
