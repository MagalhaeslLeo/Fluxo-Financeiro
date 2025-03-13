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
    public class UsuarioMap : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {

            builder.ToTable("Usuario");
            builder.Property(u => u.Id).HasColumnName("IdUsuario"); 
            builder.Property(u => u.UserName).HasColumnName("Nome");
            builder.Property(u => u.Email).HasColumnName("Email");
            builder.Property(u => u.PasswordHash).HasColumnName("Senha");

            builder.Ignore(u => u.NormalizedUserName);
            builder.Ignore(u => u.NormalizedEmail);
            builder.Ignore(u => u.EmailConfirmed);
            builder.Ignore(u => u.SecurityStamp);
            builder.Ignore(u => u.ConcurrencyStamp);
            builder.Ignore(u => u.PhoneNumber);
            builder.Ignore(u => u.PhoneNumberConfirmed);
            builder.Ignore(u => u.TwoFactorEnabled);
            builder.Ignore(u => u.LockoutEnd);
            builder.Ignore(u => u.LockoutEnabled);
            builder.Ignore(u => u.AccessFailedCount);


            builder.HasQueryFilter(u => !u.Deletado);
            builder.HasKey(u => u.IdUsuario);
            builder.Property(u => u.DataCriacao);
            builder.HasOne(u => u.Perfil).WithMany(p => p.Usuarios).HasForeignKey(u => u.IdPerfil);
            builder.HasMany(u => u.Despesas).WithOne(p => p.Usuario).HasForeignKey(u => u.IdUsuario);
            builder.HasMany(u => u.Receitas).WithOne(p => p.Usuario).HasForeignKey(u => u.IdUsuario);

        }
    }
}
