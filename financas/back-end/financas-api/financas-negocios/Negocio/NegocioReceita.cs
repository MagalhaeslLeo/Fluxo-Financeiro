using AutoMapper;
using financas_dominio.Entidade;
using financas_dominio.Interface;
using financas_negocios.Entidade;
using financas_negocios.Interface;

namespace financas_negocios.Negocio
{
    public class NegocioReceita : INegocioReceita
    {
        protected readonly IMapper map;
        protected readonly IRepositorioReceita repositorio;
        public NegocioReceita(IMapper map, IRepositorioReceita repositorio)
        {
            this.map = map;
            this.repositorio = repositorio;
        }

        public async Task<ReceitaVO> AdicionarSalvar(ReceitaVO receitaVO)
        {
            try
            {
                var receitaMap = map.Map<Receita>(receitaVO);
                var receita = await repositorio.AdicionarSalvar(receitaMap);
                var receitaRetorno = map.Map<ReceitaVO>(receita);

                return receitaRetorno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<ReceitaVO> AtualizarReceita(ReceitaVO receitaVO)
        {
            try
            {
                var receitaMap = map.Map<Receita>(receitaVO);
                var receita = await repositorio.AtualizarReceita(receitaMap);
                var receitaRetorno = map.Map<ReceitaVO>(receita);

                return receitaRetorno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<ReceitaVO> ObterReceitaPorId(int Id)
        {
            try
            {
                var receita = await repositorio.ObterReceitaPorId(Id);
                var receitaMap = map.Map<ReceitaVO>(receita);

                return receitaMap;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<ReceitaVO>> ObterTodos()
        {
            try
            {
                var lReceita = await repositorio.ObterTodos();

                var receitaMap = map.Map<IEnumerable<ReceitaVO>>(lReceita);
                return receitaMap;
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
                var receita = await repositorio.ObterReceitaPorId(Id);

                receita.Deletado = true;

                await repositorio.StatusDeletado(receita);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
