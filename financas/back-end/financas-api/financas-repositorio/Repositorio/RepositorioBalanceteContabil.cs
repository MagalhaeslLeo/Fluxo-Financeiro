using financas_dominio.Entidade;
using financas_dominio.Interface;
using financas_repositorio.Contexto;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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

        public async Task<IEnumerable<BalanceteContabil>> ObterBalanceteContabilPorPeriodo(string pPeriodicidade)
        {
            try
            {
                var query = @"
                            SELECT
                            bc.DataCriacao, bc.IdDespesa, bc.IdReceita, bc.IdPeriodicidade, bc.Deletado, 
                            bc.IdBalancete, bc.TotalDespesa, bc.TotalReceita, bc.ResultadoGeral,
                            bc.PeriodoInicial, bc.PeriodoFinal, pd.Descricao as PeriodicidadeDescricao, dp.Descricao as DespesaDescricao, rt.Descricao as ReceitaDescricao
                            from BalanceteContabil as bc
                            left join Despesa as dp on bc.IdDespesa = dp.IdDespesa
                            left join Receita as rt on bc.IdReceita = rt.IdReceita
                            left join Periodicidade as pd on bc.IdPeriodicidade = pd.IdPeriodicidade
                            where pd.Descricao = @periodicidade 
                ";

                return await contexto.BalancetesContabeis.FromSqlRaw(query, 
                    new SqlParameter("@periodicidade", pPeriodicidade)
                    //new SqlParameter("@periodoInicial", pInicial),
                    //new SqlParameter("@periodoFinal", pFinal)
                    ).ToListAsync();

            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }
    }
}
