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
    public class PeriodidicadeMap : IEntityTypeConfiguration<Periodicidade>
    {
        public void Configure(EntityTypeBuilder<Periodicidade> builder)
        {
            builder.ToTable("Periodicidade");
            builder.HasKey(p => p.IdPeriodicidade);
            builder.HasMany(p => p.Balancetes).WithOne(p => p.Periodicidade).HasForeignKey(p => p.IdPeriodicidade);
        }
    }
}
