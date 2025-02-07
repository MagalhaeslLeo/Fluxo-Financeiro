using AutoMapper;
using financas_dominio.Entidade;
using financas_negocios.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_negocios.Mapeamento
{
    public class Mapper : Profile
    {
        public Mapper()
        {

            // Mapeando de DespesaVO (Value Object) para Despesa (Entidade)
            CreateMap<DespesaVO, Despesa>()
                .ForMember(dest => dest.IdDespesa, opt => opt.MapFrom(src => src.Id)) // mapeando o campo 'id' para 'IdDespesa'
                .ForMember(dest => dest.IdTipoPagamento, opt => opt.MapFrom(src => src.IdTipoPagamentoVO))
                .ForMember(dest => dest.TipoPagamento, opt => opt.MapFrom(src => src.TipoPagamentoVO)) // mapeando tipoPagamentoVO para TipoPagamento
                .ForMember(dest => dest.IdUsuario, opt => opt.MapFrom(src => src.IdUsuarioVO))
                .ForMember(dest => dest.Usuario, opt => opt.MapFrom(src => src.UsuarioVO)); // mapeando usuarioVO para Usuario

            // Mapeamento reverso (se necessário)
            CreateMap<Despesa, DespesaVO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.IdDespesa))
                .ForMember(dest => dest.IdTipoPagamentoVO, opt => opt.MapFrom(src => src.IdTipoPagamento))
                .ForMember(dest => dest.TipoPagamentoVO, opt => opt.MapFrom(src => src.TipoPagamento))
                .ForMember(dest => dest.IdUsuarioVO, opt => opt.MapFrom(src => src.IdUsuario))
                .ForMember(dest => dest.UsuarioVO, opt => opt.MapFrom(src => src.Usuario));

            CreateMap<UsuarioVO, Usuario>()
            .ForMember(dest => dest.IdUsuario, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.IdPerfil, opt => opt.MapFrom(src => src.IdPerfilVO))
            .ForMember(dest => dest.Perfil, opt => opt.MapFrom(src => src.PerfilVO))
            .ForMember(dest => dest.Despesas, opt => opt.MapFrom(src => src.DespesasVO)) 
            .ForMember(dest => dest.Receitas, opt => opt.MapFrom(src => src.ReceitasVO)); 

            
            CreateMap<Usuario, UsuarioVO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.IdUsuario))
                .ForMember(dest => dest.IdPerfilVO, opt => opt.MapFrom(src => src.IdPerfil))
                .ForMember(dest => dest.PerfilVO, opt => opt.MapFrom(src => src.Perfil))
                .ForMember(dest => dest.DespesasVO, opt => opt.MapFrom(src => src.Despesas)) 
                .ForMember(dest => dest.ReceitasVO, opt => opt.MapFrom(src => src.Receitas));

            CreateMap<PerfilVO, Perfil>()
            .ForMember(dest => dest.IdPerfil, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Usuarios, opt => opt.MapFrom(src => src.UsuariosVO));

            CreateMap<Perfil, PerfilVO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.IdPerfil))
            .ForMember(dest => dest.UsuariosVO, opt => opt.MapFrom(src => src.Usuarios));

            CreateMap<ReceitaVO, Receita>()
            .ForMember(dest => dest.IdReceita, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.IdFonteRenda, opt => opt.MapFrom(src => src.IdFonteRendaVO))
            .ForMember(dest => dest.FonteRenda, opt => opt.MapFrom(src => src.FonteRendaVO))
            .ForMember(dest => dest.IdUsuario, opt => opt.MapFrom(src => src.IdUsuarioVO))
            .ForMember(dest => dest.Usuario, opt => opt.MapFrom(src => src.UsuarioVO));

            CreateMap<Receita, ReceitaVO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.IdReceita))
            .ForMember(dest => dest.IdFonteRendaVO, opt => opt.MapFrom(src => src.IdFonteRenda))
            .ForMember(dest => dest.FonteRendaVO, opt => opt.MapFrom(src => src.FonteRenda))
            .ForMember(dest => dest.IdUsuarioVO, opt => opt.MapFrom(src => src.IdUsuario))
            .ForMember(dest => dest.UsuarioVO, opt => opt.MapFrom(src => src.Usuario));

            CreateMap<TipoPagamentoVO, TipoPagamento>()
            .ForMember(dest => dest.IdTipoPagamento, opt => opt.MapFrom(src => src.IdTipoPagamentoVO))
            .ForMember(dest => dest.Despesas, opt => opt.MapFrom(src => src.DespesasVO));

            CreateMap<TipoPagamento, TipoPagamentoVO>()
            .ForMember(dest => dest.IdTipoPagamentoVO, opt => opt.MapFrom(src => src.IdTipoPagamento))
            .ForMember(dest => dest.DespesasVO, opt => opt.MapFrom(src => src.Despesas));

            CreateMap<FonteRendaVO, FonteRenda>()
            .ForMember(dest => dest.IdFonteRenda, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Receitas, opt => opt.MapFrom(src => src.ReceitasVO));

            CreateMap<FonteRenda, FonteRendaVO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.IdFonteRenda))
            .ForMember(dest => dest.ReceitasVO, opt => opt.MapFrom(src => src.Receitas));

        }
    }
}
