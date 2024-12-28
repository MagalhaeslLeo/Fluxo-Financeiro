using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_negocios.Entidade
{
    public class PerfilVO
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public DateTime DataCriacao { get; set; }
        public bool Deletado { get; set; }
    }
}
