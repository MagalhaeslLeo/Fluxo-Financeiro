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
            CreateMap<UsuarioVO, Usuario>().ReverseMap();
        }
    }
}
