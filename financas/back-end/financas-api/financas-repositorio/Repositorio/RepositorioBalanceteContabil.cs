using financas_dominio.Entidade;
using financas_dominio.Interface;
using financas_repositorio.Contexto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_repositorio.Repositorio
{
    public class RepositorioBalanceteContabil : RepositorioBase<BalanceteContabil>, IRepositorioBalanceteContabil
    {
        public RepositorioBalanceteContabil(DbContexto contexto) : base(contexto) { }

        public async Task<BalanceteContabil> AtualizarBalanceteContabil(BalanceteContabil balancete)
        {
            try
            {
                var atualizaEntidade = await contexto.BalancetesContabeis.SingleOrDefaultAsync(b=>b.IdBalancete.Equals(balancete.IdBalancete));
                if(atualizaEntidade == null)
                {
                    return null;
                }
                contexto.Entry(atualizaEntidade).CurrentValues.SetValues(balancete);
                await contexto.SaveChangesAsync();
                return balancete;
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }

        public async Task<BalanceteContabil> ObterBalanceteContabilPorId(int id)
        {
            try
            {
                return await contexto.BalancetesContabeis.SingleOrDefaultAsync(b => b.IdBalancete.Equals(id));
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }

        public async Task<IEnumerable<BalanceteContabil>> ObterBalanceteContabilPorPeriodo(string pDescricao, string pInicial, string pFinal)
        {
            try
            {
                var query = @"
                            SELECT 
                            bc.IdBalancete, bc.TotalDespesa, bc.TotalReceita, bc.ResultadoGeral,
                            bc.PeriodoInicial, bc.PeriodoFinal
                            from BalanceteContabil as bc
                            join Despesa as dp on bc.IdDespesa = dp.IdDespesa
                            join Receita as rt on bc.IdReceita = rt.IdReceita
                            join Periodicidade as pd on bc.IdPeriodicidade = pd.IdPeriodicidade
                            where pd.Descricao = @descricao 
                            and bc.PeriodoInicial between @periodoInicial and @periodoFinal
                            and bc.PeriodoFinal between @periodoInicial and @periodoFinal
                ";

                return await contexto.BalancetesContabeis.FromSqlRaw(query, 
                    new SqlParameter("@descricao", pDescricao),
                    new SqlParameter("@periodoInicial", pInicial),
                    new SqlParameter("@periodoFinal", pFinal)
                    ).ToListAsync();

            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }
    }
}
