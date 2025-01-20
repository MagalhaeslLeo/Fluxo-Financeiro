using financas_dominio.Entidade;
using financas_dominio.Interface;
using financas_repositorio.Contexto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_repositorio.Repositorio
{
    public class RepositorioDespesa : RepositorioBase<Despesa>, IRepositorioDespesa
    {
        public RepositorioDespesa(DbContexto contexto) : base(contexto){ }

        public async Task<IEnumerable<TipoPagamento>> ObterTiposPagamentos()
        {
            try
            {
                return await contexto.TipoPagamentos.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

    }
}
