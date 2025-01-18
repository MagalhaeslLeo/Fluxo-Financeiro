using financas_dominio.Entidade;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_repositorio.Mapeamento
{
    public class CartaoMap : IEntityTypeConfiguration<Cartao>
    {
        public void Configure(EntityTypeBuilder<Cartao> builder)
        {

            builder.ToTable("Cartao");
            builder.HasQueryFilter(u => !u.Deletado);
            builder.HasKey(u => u.IdCartao);
            builder.Property(u => u.DataCriacao);

        }
    }
}
