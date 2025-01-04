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
    public class NegocioPerfil : INegocioPerfil
    {
        protected readonly IMapper map;

        protected readonly IRepositorioPerfil repositorio;

        public NegocioPerfil(IMapper map, IRepositorioPerfil repositorio)
        {
            this.map = map;
            this.repositorio = repositorio;
        }

        public async Task<PerfilVO> AdicionarSalvar(PerfilVO perfilVO)
        {
            try
            {
                var perfilMap = map.Map<Perfil>(perfilVO);
                var perfil = await repositorio.AdicionarSalvar(perfilMap);
                var perfilRetorno = map.Map<PerfilVO>(perfil);

                return perfilRetorno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<PerfilVO> Atualizar(PerfilVO perfilVO)
        {
            try
            {
                var perfilMap = map.Map<Perfil>(perfilVO);
                var perfil = await repositorio.Atualizar(perfilMap);
                var perfilRetorno = map.Map<PerfilVO>(perfil);

                return perfilRetorno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<PerfilVO> ObterPorId(int Id)
        {
            try
            {
                var perfil = await repositorio.ObterPorID(Id);
                var perfilMap = map.Map<PerfilVO>(perfil);

                return perfilMap;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<PerfilVO>> ObterTodos()
        {
            try
            {
                var lPerfil = await repositorio.ObterTodos();

                var perfilMap = map.Map<IEnumerable<PerfilVO>>(lPerfil);
                return perfilMap;
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
                var perfil = await repositorio.ObterPorID(Id);

                perfil.Deletado = true;

                await repositorio.StatusDeletado(perfil);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
