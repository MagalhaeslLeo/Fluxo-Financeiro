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

            CreateMap<UsuarioVO, Usuario>().ReverseMap();
            CreateMap<PerfilVO, Perfil>().ReverseMap();
            CreateMap<ReceitaVO, Receita>().ReverseMap();
            CreateMap<TipoPagamentoVO, TipoPagamento>().ReverseMap();
            CreateMap<FonteRendaVO, FonteRenda>().ReverseMap();

        }
    }
}
