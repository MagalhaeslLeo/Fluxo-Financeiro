using financas_dominio.Entidade;
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
        Task<DespesaVO> ObterDespesaPorId(int Id);
        Task<DespesaVO> AtualizarDespesa(DespesaVO despesaVO);
        Task StatusDeletado(int Id);
        Task<IEnumerable<TipoPagamentoVO>> ObterTiposPagamentos();

    }
}
