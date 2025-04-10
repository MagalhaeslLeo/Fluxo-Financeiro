﻿using financas_dominio.Entidade;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_repositorio.Mapeamento
{
    public class BalanceteContabilMap : IEntityTypeConfiguration<BalanceteContabil>
    {
        public void Configure(EntityTypeBuilder<BalanceteContabil> builder)
        {
            builder.ToTable("BalanceteContabil");
            builder.HasQueryFilter(b => !b.Deletado);
            builder.HasKey(b => b.IdBalancete);
            builder.HasOne(b => b.Periodicidade).WithMany(b => b.Balancetes).HasForeignKey(b => b.IdPeriodicidade);


        }
    }
}
