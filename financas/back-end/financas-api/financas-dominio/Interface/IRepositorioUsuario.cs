using financas_dominio.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_dominio.Interface
{
    public interface IRepositorioUsuario
    {
        Task<IEnumerable<Usuario>> ObterUsuariosComPerfil();
        Task<Usuario> ObterUsuarioPorID(int id);

        Task<Usuario> Atualizar(Usuario usuario);

        Task<Usuario> ObterUsuarioPorEmailSenha(string email, string senha);
        IQueryable<Usuario> Queryable();
        Task Commit();
        void Adicionar(Usuario entidade);
        Task<Usuario> AdicionarSalvar(Usuario entidade);
        Task<IEnumerable<Usuario>> ObterTodos();
        Task StatusDeletado(Usuario entidade);
        Task LogarUsuario(Usuario usuario, bool lembrar);

    }
}
