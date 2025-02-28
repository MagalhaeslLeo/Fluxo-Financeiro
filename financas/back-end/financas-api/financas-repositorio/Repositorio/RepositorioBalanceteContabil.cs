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
                var atualizaEntidade = await contexto.BalancetesContabeis.SingleOrDefaultAsync(b => b.IdBalancete.Equals(balancete.IdBalancete));
                if (atualizaEntidade == null)
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
                    ).ToListAsync();

            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }
        public async Task <ResultadoCalculoBalancete> CalcularBalanceteContabilAnual(string pInicial, string pFinal)
        {
            try
            {
                var query = @"
                            create table #TempBalancete(
                            ValorReceita decimal (18,2),
                            ValorDespesa decimal (18,2)
                                                       )
                            -- Soma todas as receitas
                            insert into #TempBalancete(ValorReceita, ValorDespesa)
                            select

                            sum(isnull(rta.Valor, 0))as receita,
                            0 as despesa

                            from Receita rta
                            where year(rta.DataCriacao) between @periodoInicial and '@periodoFinal


                            -- Soma todas as despesas
                            insert into #TempBalancete(ValorDespesa, ValorReceita)
                            select
                            sum(isnull(dpa.Valor, 0))as despesa,
                            0 as receita

                            from Despesa dpa

                            where year(dpa.DataCriacao) between @periodoInicial and @periodoFinal


                            -- Calcula o resultado geral
                            select
                            sum(isnull(ValorReceita, 0))as TotalReceitas,
                            sum(isnull(ValorDespesa, 0))as TotalDespesas,
                            sum(isnull(ValorReceita, 0)) - sum(isnull(ValorDespesa, 0)) as ResultadoGeral

                            from #TempBalancete

                            drop table #TempBalancete
                ";

                var parametros = new[]
                {                    
                    new SqlParameter("@periodoInicial", pInicial),
                    new SqlParameter("@periodoFinal", pFinal)
                };
                var resultado = await contexto.Set<ResultadoCalculoBalancete>()
                    .FromSqlRaw(query, parametros)
                    .FirstOrDefaultAsync();
                return resultado;
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }
    }
}
