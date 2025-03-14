﻿using financas_dominio.Entidade;
using financas_dominio.Interface;
using financas_repositorio.Contexto;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
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
                var balancetesContabeis = await contexto.BalancetesContabeis
                    .Include(bc => bc.Periodicidade)
                    .Where(bc => bc.Periodicidade.Descricao == pPeriodicidade)
                    .ToListAsync();

                return balancetesContabeis;
            }
            catch (Exception exception)
            {
                throw new Exception(exception.Message, exception);
            }
        }

        //public async Task<IEnumerable<BalanceteContabil>> ObterBalanceteContabilPorPeriodo(string pPeriodicidade)
        //{
        //    try
        //    {
        //        IQueryable<BalanceteContabil> query = contexto.BalancetesContabeis;
        //        query = query.Include(b=>b.Periodicidade).Where(p => p.Periodicidade.Descricao == pPeriodicidade);
        //        var lista = await query.ToListAsync();

        //        return lista;

        //    }
        //    catch (Exception exception)
        //    {

        //        throw new Exception(exception.Message, exception);

        //    }
        //}
        public async Task <ResultadoCalculoBalancete> ResultadoBalanceteContabil(string pInicial, string pFinal, string pPeriodicidade)
        {
            try
            {
                var resultadoReceitas = await CalcularReceitaPorPeriodicidade(pInicial, pFinal, pPeriodicidade);
                var resultadoDespesas = await CalcularDespesaPorPeriodicidade(pInicial, pFinal, pPeriodicidade);

                var resultadoCalculado = new ResultadoCalculoBalancete
                {
                    TotalReceitas = resultadoReceitas,
                    TotalDespesas = resultadoDespesas,
                    ResultadoGeral = resultadoReceitas - resultadoDespesas
                };

                return resultadoCalculado;
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }

        private async Task<decimal> CalcularReceitaPorPeriodicidade(string pInicial, string pFinal, string pPeriodicidade)
        {
            try
            {
                DateTime periodoInicial;
                DateTime periodoFinal;
                IQueryable<Receita> query = contexto.Receitas;
                if (pPeriodicidade.ToLower() == "anual")
                {
                    periodoInicial = DateTime.ParseExact(pInicial, "yyyy", CultureInfo.InvariantCulture);
                    periodoFinal = DateTime.ParseExact(pFinal, "yyyy", CultureInfo.InvariantCulture);

                    query = query.Where(r=>r.DataCriacao.Year >= periodoInicial.Year && r.DataCriacao.Year <= periodoFinal.Year);
                }
                else if(pPeriodicidade.ToLower() == "mensal")
                {
                    periodoInicial = DateTime.ParseExact(pInicial, "MM/yyyy", CultureInfo.InvariantCulture);
                    periodoFinal = DateTime.ParseExact(pFinal, "MM/yyyy", CultureInfo.InvariantCulture);

                    query = query.Where(r => r.DataCriacao.Year >= periodoInicial.Year && r.DataCriacao.Year <= periodoFinal.Year &&
                    r.DataCriacao.Month >= periodoInicial.Month && r.DataCriacao.Month <= periodoFinal.Month);
                }

                decimal totalReceitas = await query.SumAsync(r => r.Valor);
                return totalReceitas;
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }
        private async Task<decimal> CalcularDespesaPorPeriodicidade(string pInicial, string pFinal, string pPeriodicidade)
        {
            try
            {
                DateTime periodoInicial;
                DateTime periodoFinal;
                IQueryable<Despesa> query = contexto.Despesas;
                if (pPeriodicidade.ToLower() == "anual")
                {
                    periodoInicial = DateTime.ParseExact(pInicial, "yyyy", CultureInfo.InvariantCulture);
                    periodoFinal = DateTime.ParseExact(pFinal, "yyyy", CultureInfo.InvariantCulture);

                    query = query.Where(d => d.DataCriacao.Year >= periodoInicial.Year && d.DataCriacao.Year <= periodoFinal.Year);
                }
                else if (pPeriodicidade.ToLower() == "mensal")
                {
                    periodoInicial = DateTime.ParseExact(pInicial, "MM/yyyy", CultureInfo.InvariantCulture);
                    periodoFinal = DateTime.ParseExact(pFinal, "MM/yyyy", CultureInfo.InvariantCulture);

                    query = query.Where(d => d.DataCriacao.Year >= periodoInicial.Year && d.DataCriacao.Year <= periodoFinal.Year &&
                    d.DataCriacao.Month >= periodoInicial.Month && d.DataCriacao.Month <= periodoFinal.Month);
                }

                decimal totalDespesas = await query.SumAsync(d => d.Valor);
                return totalDespesas;
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }
        //private async Task<IEnumerable<BalanceteContabil>> ObterPeriodos()
        //{
        //    var periodos = await ObterTodos();
        //    return periodos;
        //}
    }
}
