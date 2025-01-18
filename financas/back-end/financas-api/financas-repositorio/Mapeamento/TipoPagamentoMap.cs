using financas_dominio.Entidade;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_repositorio.Mapeamento
{
    public class TipoPagamentoMap : IEntityTypeConfiguration<TipoPagamento>
    {
        public void Configure(EntityTypeBuilder<TipoPagamento> builder)
        {

            builder.ToTable("TipoPagamento");
            builder.HasQueryFilter(u => !u.Deletado);
            builder.HasKey(u => u.IdTipoPagamento);
            builder.Property(u => u.DataCriacao);
        }
    }
}
