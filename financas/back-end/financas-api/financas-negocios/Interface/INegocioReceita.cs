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
        Task<IEnumerable<ReceitaVO>> ObterReceitasComFontesRendas();
        Task<IEnumerable<ReceitaVO>> ObterTodos();
        Task<ReceitaVO> ObterReceitaPorId(int Id);
        Task<ReceitaVO> AtualizarReceita(ReceitaVO receitaVO);
        Task StatusDeletado(int Id);

    }
}
