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
    public class NegocioFonteRenda : INegocioFonteRenda
    {
        protected readonly IMapper map;
        protected readonly IRepositorioFonteRenda repositorio;

        public NegocioFonteRenda(IMapper map, IRepositorioFonteRenda repositorio)
        {
            this.map = map;
            this.repositorio = repositorio;
        }

        public async Task<FonteRendaVO> AdicionarSalvar(FonteRendaVO fonteRendaVO)
        {
            try
            {
                var rendaMap = map.Map<FonteRenda>(fonteRendaVO);
                var renda = await repositorio.AdicionarSalvar(rendaMap);
                var rendaRetorno = map.Map<FonteRendaVO>(renda);
                return rendaRetorno;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<FonteRendaVO> AtualizarFonteRenda(FonteRendaVO fonteRendaVO)
        {
            try
            {
                var rendaMap = map.Map<FonteRenda>(fonteRendaVO);
                var renda = await repositorio.AtualizarFonteRenda(rendaMap);
                var rendaRetorno = map.Map<FonteRendaVO>(renda);
                return rendaRetorno;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<FonteRendaVO> ObterFonteRendaPorId(int id)
        {
            try
            {
                var renda = await repositorio.ObterFonteRendaPorId(id);
                var rendaMap = map.Map<FonteRendaVO>(renda);
                return rendaMap;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<IEnumerable<FonteRendaVO>> ObterTodos()
        {
            try
            {
                var lRenda = await repositorio.ObterTodos();
                var rendaMap = map.Map<IEnumerable<FonteRendaVO>>(lRenda);
                return rendaMap;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task StatusDeletado(int id)
        {
            try
            {
                var renda = await repositorio.ObterFonteRendaPorId(id);
                renda.Deletado = true;
                await repositorio.StatusDeletado(renda);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
