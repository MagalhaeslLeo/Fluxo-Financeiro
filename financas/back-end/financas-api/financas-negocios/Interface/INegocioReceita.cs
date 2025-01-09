using financas_negocios.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_negocios.Interface
{
    public interface INegocioReceita
    {
        Task<ReceitaVO> AdicionarSalvar(ReceitaVO receitaVO);
        Task<IEnumerable<ReceitaVO>> ObterTodos();
        Task<ReceitaVO> ObterPorId(int Id);
        Task<ReceitaVO> Atualizar(ReceitaVO receitaVO);
        Task StatusDeletado(int Id);

    }
}
