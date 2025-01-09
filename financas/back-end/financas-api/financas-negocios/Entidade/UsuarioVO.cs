using financas_dominio.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_negocios.Entidade
{
    public class UsuarioVO
    {
        public int Id { get; set; }
        public DateTime DataCriacao { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public PerfilVO PerfilVO { get; set; }
        public int IdPerfilVO { get; set; }

        public ICollection<DespesaVO> DespesasVO { get; set; }
        public ICollection<ReceitaVO> ReceitasVO { get; set; }
    }
}
