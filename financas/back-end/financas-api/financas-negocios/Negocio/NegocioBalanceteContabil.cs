using AutoMapper;
using financas_dominio.Entidade;
using financas_dominio.Interface;
using financas_negocios.Entidade;
using financas_negocios.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_negocios.Negocio
{
    public class NegocioBalanceteContabil : INegocioBalanceteContabil
    {
        protected readonly IMapper map;
        protected readonly IRepositorioBalanceteContabil repositorio;

        public NegocioBalanceteContabil(IMapper map, IRepositorioBalanceteContabil repositorio)
        {
            this.map = map;
            this.repositorio = repositorio;
        }

        public async Task<BalanceteContabilVO> AdicionarSalvar(BalanceteContabilVO balanceteVO)
        {
            try
            {
                var balanceteMap = map.Map<BalanceteContabil>(balanceteVO);
                var balancete = await repositorio.AdicionarSalvar(balanceteMap);
                var balanceteRetorno = map.Map<BalanceteContabilVO>(balancete);

                return balanceteRetorno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<BalanceteContabilVO> AtualizarBalanceteContabil(BalanceteContabilVO balanceteVO)
        {
            try
            {
                var balanceteMap = map.Map<BalanceteContabil>(balanceteVO);
                var balancete = await repositorio.AtualizarBalanceteContabil(balanceteMap);
                var balanceteRetorno = map.Map<BalanceteContabilVO>(balancete);

                return balanceteRetorno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task <ResultadoCalculoBalanceteVO> CalcularBalanceteContabilAnual(string pInicial, string pFinal)
        {
            try
            {
                var resultado = await repositorio.CalcularBalanceteContabilAnual(pInicial, pFinal);
                var resultadoRetorno = map.Map<ResultadoCalculoBalanceteVO>(resultado);
                return resultadoRetorno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<BalanceteContabilVO> ObterBalanceteContabilPorId(int id)
        {
            try
            {
                var balancete = await repositorio.ObterBalanceteContabilPorId(id);
                var balanceteRetorno = map.Map<BalanceteContabilVO>(balancete);
                return balanceteRetorno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<BalanceteContabilVO>> ObterBalanceteContabilPorPeriodo(string pPeriodicidade)
        {
            try
            {
                var balancete = await repositorio.ObterBalanceteContabilPorPeriodo(pPeriodicidade);

                var balanceteRetorno = map.Map<IEnumerable<BalanceteContabilVO>>(balancete);
                return balanceteRetorno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<BalanceteContabilVO>> ObterTodos()
        {
            try
            {
                var lBalancete = await repositorio.ObterTodos();

                var balanceteRetorno = map.Map<IEnumerable<BalanceteContabilVO>>(lBalancete);
                return balanceteRetorno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task StatusDeletado(int id)
        {
            try
            {
                var balancete = await repositorio.ObterBalanceteContabilPorId(id);
                balancete.Deletado = true;
                await repositorio.StatusDeletado(balancete);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
