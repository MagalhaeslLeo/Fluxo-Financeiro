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
    internal class NegocioUsuario : INegocioUsuario
    {
        protected readonly IMapper _mapper;
        protected readonly IRepositorioUsuario _repositorioUsuario;
        public NegocioUsuario(IMapper mapper, IRepositorioUsuario repositorioUsuario)
        {
            mapper = _mapper;
            repositorioUsuario = _repositorioUsuario;
        }
        public async Task AdicionarSalvar(UsuarioVO usuarioVO)
        {
            try
            {
                var usuarioMap = _mapper.Map<Usuario>(usuarioVO);
                if(usuarioMap.Id.Equals(Guid.Empty))
                {
                    usuarioMap.Id= Guid.NewGuid();
                }
                await _repositorioUsuario.AdicionarSalvar(usuarioMap);
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
                var usuarioMap = _mapper.Map<Usuario>(usuarioVO);

                var usuarioEntidade = await _repositorioUsuario.Atualizar(usuarioMap);

                var usuarioRetorno = _mapper.Map<UsuarioVO>(usuarioEntidade);

                return usuarioRetorno;


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<UsuarioVO> ObterPorID(Guid Id)
        {
            try
            {
                var usuario = await _repositorioUsuario.ObterPorID(Id);

                var usuarioMap = _mapper.Map<UsuarioVO>(usuario);

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
                var usuario = await _repositorioUsuario.ObterTodos();

                var usuarioMap = _mapper.Map<IEnumerable<UsuarioVO>>(usuario);
                return usuarioMap;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task StatusDeletado(Guid Id)
        {
            try
            {
                var usuario = await _repositorioUsuario.ObterPorID(Id);

                if(usuario.Id.Equals(Guid.Empty))
                {
                    throw new Exception("Usuário já deletado ou não existe");
                }

                usuario.Deletado = true;

                await _repositorioUsuario.StatusDeletado(usuario);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
