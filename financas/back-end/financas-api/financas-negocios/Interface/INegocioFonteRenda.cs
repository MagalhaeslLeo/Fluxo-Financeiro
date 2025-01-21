using financas_negocios.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_negocios.Interface
{
    public interface INegocioFonteRenda
    {
        Task<FonteRendaVO> AdicionarSalvar(FonteRendaVO fonteRendaVO);
        Task<IEnumerable<FonteRendaVO>> ObterTodos();
        Task<FonteRendaVO> ObterFonteRendaPorId(int id);
        Task<FonteRendaVO> AtualizarFonteRenda(FonteRendaVO fonteRendaVO);
        Task StatusDeletado(int id);

    }
}
