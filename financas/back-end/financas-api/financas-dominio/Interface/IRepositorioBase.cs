using financas_dominio.IdEntidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace financas_dominio.Interface
{
    public interface IRepositorioBase<T> where T: EntidadeBase
    {
        IQueryable<T> Queryable();
        Task Commit();
        void Adicionar(T entidade);
        Task<T> AdicionarSalvar(T entidade);
        Task<IEnumerable<T>> ObterTodos();
        Task<T> ObterPorID(Guid Id);
        Task<T> Atualizar(T entidade);
        Task StatusDeletado(T entidade);

    }
}
