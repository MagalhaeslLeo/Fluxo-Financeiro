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
    public class PerfilMap : IEntityTypeConfiguration<Perfil>
    {
        public void Configure(EntityTypeBuilder<Perfil> builder)
        {
			try
			{
                builder.ToTable("Perfil");
                builder.HasQueryFilter(p => !p.Deletado);
                builder.Property(p => p.Descricao).IsRequired().HasMaxLength(50);
                builder.HasMany(p => p.Usuarios).WithOne(u => u.Perfil).HasForeignKey(u => u.IdPerfil);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
