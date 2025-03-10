using financas_dominio.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_dominio.Interface
{
    public interface IRepositorioUsuario : IRepositorioBase<Usuario>
    {
        Task<IEnumerable<Usuario>> ObterUsuariosComPerfil();
        Task<Usuario> ObterUsuarioPorID(int id);

        Task<Usuario> Atualizar(Usuario usuario);

        Task<Usuario> ObterUsuarioPorEmailSenha(string email, string senha);

    }
}
