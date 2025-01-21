using financas_dominio.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_dominio.Interface
{
    public interface IRepositorioReceita : IRepositorioBase<Receita>
    {
        Task<Receita> ObterReceitaPorId(int id);
        Task<Receita> AtualizarReceita(Receita receita);
    }
}
