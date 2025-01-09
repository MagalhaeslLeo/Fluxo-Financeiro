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
    public class DespesaMap : IEntityTypeConfiguration<Despesa>
    {
        public void Configure(EntityTypeBuilder<Despesa> builder)
        {

                builder.ToTable("Despesa");
                builder.HasQueryFilter(u => !u.Deletado);
                builder.HasKey(u => u.Id);
                builder.Property(u => u.DataCriacao);
                builder.HasOne(u => u.Usuario).WithMany(p => p.Despesas).HasForeignKey(u => u.IdUsuario);

        }
    }
}
