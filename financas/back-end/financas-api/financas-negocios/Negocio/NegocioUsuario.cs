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
    public class NegocioUsuario : INegocioUsuario
    {
        protected readonly IMapper map;
        protected readonly IRepositorioUsuario repositorio;
        public NegocioUsuario(IMapper mapper, IRepositorioUsuario repositorioUsuario)
        {
            map = mapper;
            repositorio = repositorioUsuario;
        }
        public async Task<UsuarioVO> AdicionarSalvar(UsuarioVO usuarioVO)
        {
            try
            {
                var usuarioMap = map.Map<Usuario>(usuarioVO);
                var usuario = await repositorio.AdicionarSalvar(usuarioMap);
                var usuarioRetorno = map.Map<UsuarioVO>(usuario);

                return usuarioRetorno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<UsuarioVO> Atualizar(UsuarioVO usuarioVO)
        {
            try
            {
                var usuarioMap = map.Map<Usuario>(usuarioVO);

                var usuarioEntidade = await repositorio.Atualizar(usuarioMap);

                var usuarioRetorno = map.Map<UsuarioVO>(usuarioEntidade);

                return usuarioRetorno;


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<UsuarioVO> ObterUsuarioPorID(int Id)
        {
            try
            {
                var usuario = await repositorio.ObterUsuarioPorID(Id);

                var usuarioMap = map.Map<UsuarioVO>(usuario);

                return usuarioMap;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<UsuarioVO>> ObterTodos()
        {
            try
            {
                var lUsuario = await repositorio.ObterTodos();

                //var lUsuarioAtivos = lUsuario.Where(us => us.Deletado.Equals(false));

                var usuarioMap = map.Map<IEnumerable<UsuarioVO>>(lUsuario);
                return usuarioMap;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<UsuarioVO>> ObterUsuariosComPerfil()
        {
            try
            {
                var lUsuariosPerfil = await repositorio.ObterUsuariosComPerfil();
                var lUsuariosPerfilVO = map.Map<IEnumerable<UsuarioVO>>(lUsuariosPerfil);

                return lUsuariosPerfilVO;
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
                var usuario = await repositorio.ObterUsuarioPorID(Id);

                usuario.Deletado = true;

                await repositorio.StatusDeletado(usuario);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<UsuarioVO> ObterUsuarioPorEmailSenha(string email, string senha)
        {
            try
            {
                var usuario = await repositorio.ObterUsuarioPorEmailSenha(email, senha);

                var usuarioRetorno = map.Map<UsuarioVO>(usuario);

                return usuarioRetorno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
