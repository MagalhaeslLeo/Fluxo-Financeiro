using financas_negocios.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_negocios.Interface
{
    public interface INegocioDespesa
    {
        Task<DespesaVO> AdicionarSalvar(DespesaVO despesaVO);
        Task<IEnumerable<DespesaVO>> ObterTodos();
        Task<DespesaVO> ObterPorId(int Id);
        Task<DespesaVO> Atualizar(DespesaVO despesaVO);
        Task StatusDeletado(int Id);

    }
}
