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
    public class FonteRendaMap : IEntityTypeConfiguration<FonteRenda>
    {
        public void Configure(EntityTypeBuilder<FonteRenda> builder)
        {

            builder.ToTable("FonteRenda");
            builder.HasQueryFilter(u => !u.Deletado);
            builder.HasKey(u => u.IdFonteRenda);
            builder.Property(u => u.DataCriacao);
            builder.HasMany(t => t.Receitas).WithOne(t => t.FonteRenda).HasForeignKey(t => t.IdFonteRenda);

        }

    }
}
