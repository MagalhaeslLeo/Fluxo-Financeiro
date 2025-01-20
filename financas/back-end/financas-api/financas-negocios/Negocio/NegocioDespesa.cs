using AutoMapper;
using financas_dominio.Entidade;
using financas_dominio.Interface;
using financas_negocios.Entidade;
using financas_negocios.Interface;

namespace financas_negocios.Negocio
{
    public class NegocioDespesa : INegocioDespesa
    {
        protected readonly IMapper map;
        protected readonly IRepositorioDespesa repositorio;
        public NegocioDespesa(IMapper map, IRepositorioDespesa repositorio)
        {
            this.map = map;
            this.repositorio = repositorio;
        }

        public async Task<DespesaVO> AdicionarSalvar(DespesaVO despesaVO)
        {
            try
            {
                var despesaMap = map.Map<Despesa>(despesaVO);
                var despesa = await repositorio.AdicionarSalvar(despesaMap);
                var despesaRetorno = map.Map<DespesaVO>(despesa);

                return despesaRetorno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<DespesaVO> Atualizar(DespesaVO despesaVO)
        {
            try
            {
                var despesaMap = map.Map<Despesa>(despesaVO);
                var despesa = await repositorio.Atualizar(despesaMap);
                var despesaRetorno = map.Map<DespesaVO>(despesa);

                return despesaRetorno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<DespesaVO> ObterPorId(int Id)
        {
            try
            {
                var despesa = await repositorio.ObterPorID(Id);
                var despesaMap = map.Map<DespesaVO>(despesa);

                return despesaMap;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<TipoPagamentoVO>> ObterTiposPagamentos()
        {
            try
            {
                var lTipoPagamento = await repositorio.ObterTiposPagamentos();
                var tipoPagamentoMap = map.Map<IEnumerable<TipoPagamentoVO>>(lTipoPagamento);
                return tipoPagamentoMap;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<DespesaVO>> ObterTodos()
        {
            try
            {
                var lDespesa = await repositorio.ObterTodos();

                var despesaMap = map.Map<IEnumerable<DespesaVO>>(lDespesa);
                return despesaMap;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task StatusDeletado(int Id)
        {
            try
            {
                var despesa = await repositorio.ObterPorID(Id);

                despesa.Deletado = true;

                await repositorio.StatusDeletado(despesa);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
