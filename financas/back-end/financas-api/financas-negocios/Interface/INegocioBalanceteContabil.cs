using financas_negocios.Entidade;

namespace financas_negocios.Interface
{
    public interface INegocioBalanceteContabil
    {
        Task<BalanceteContabilVO> AdicionarSalvar(BalanceteContabilVO balanceteVO);
        Task<IEnumerable<BalanceteContabilVO>> ObterTodos();
        Task<BalanceteContabilVO> ObterBalanceteContabilPorId(int id);
        Task<BalanceteContabilVO> AtualizarBalanceteContabil(BalanceteContabilVO balanceteVO);
        Task StatusDeletado(int id);
        Task<IEnumerable<BalanceteContabilVO>> ObterBalanceteContabilPorPeriodo(string pPeriodicidade);
    }
}
