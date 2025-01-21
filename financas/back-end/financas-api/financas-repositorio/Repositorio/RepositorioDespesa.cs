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

        public async Task<Despesa> AtualizarDespesa(Despesa despesa)
        {
            try
            {
                var atualizaEntidade = await contexto.Despesas.SingleOrDefaultAsync(e => e.IdDespesa.Equals(despesa.IdDespesa));

                if (atualizaEntidade == null)
                {
                    return null;
                }
                contexto.Entry(atualizaEntidade).CurrentValues.SetValues(despesa);
                await contexto.SaveChangesAsync();
                return despesa;
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }

        public async Task<Despesa> ObterDespesaPorId(int id)
        {
            try
            {
                return await contexto.Despesas.SingleOrDefaultAsync(e => e.IdDespesa.Equals(id));
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }

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
