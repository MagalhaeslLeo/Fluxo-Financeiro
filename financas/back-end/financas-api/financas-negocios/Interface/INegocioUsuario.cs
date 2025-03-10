using financas_negocios.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_negocios.Interface
{
    public interface INegocioUsuario
    {
        Task<UsuarioVO> AdicionarSalvar(UsuarioVO usuarioVO);

        Task<IEnumerable<UsuarioVO>> ObterTodos();

        Task<UsuarioVO> Atualizar(UsuarioVO usuarioVO);

        Task StatusDeletado(int Id);

        Task<IEnumerable<UsuarioVO>> ObterUsuariosComPerfil();

        Task<UsuarioVO> ObterUsuarioPorID(int Id);

        Task<UsuarioVO> ObterUsuarioPorEmailSenha(string email, string senha);

    }
}
