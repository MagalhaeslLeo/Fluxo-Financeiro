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
    public class BalanceteMap : IEntityTypeConfiguration<BalanceteContabil>
    {
        public void Configure(EntityTypeBuilder<BalanceteContabil> builder)
        {
            builder.ToTable("BalanceteContabil");
            builder.HasQueryFilter(b => !b.Deletado);
            builder.HasOne(b=>b.Receita).WithMany(b=>b.Balancetes).HasForeignKey(b=>b.IdReceita);
            builder.HasOne(b => b.Despesa).WithMany(b => b.Balancetes).HasForeignKey(b => b.IdDespesa);
            builder.HasOne(b => b.Periodicidade).WithMany(b => b.Balancetes).HasForeignKey(b => b.IdPeriodicidade);


        }
    }
}
