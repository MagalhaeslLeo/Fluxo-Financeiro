using financas_dominio.Entidade;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using static System.Net.Mime.MediaTypeNames;

namespace financas_repositorio.Contexto
{
    public class DbContexto: IdentityDbContext<Usuario, IdentityRole<int>, int>
    {
        public DbContexto(DbContextOptions<DbContexto> options ) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Perfil> Perfis { get; set; }
        public DbSet<Despesa> Despesas { get; set; }
        public DbSet<Receita> Receitas { get; set; }
        public DbSet<Cartao> Cartoes { get; set; }
        public DbSet<TipoPagamento> TipoPagamentos { get; set; }
        public DbSet<FonteRenda> FonteRendas { get; set; }
        public DbSet<BalanceteContabil> BalancetesContabeis { get; set; }
        public DbSet<Periodicidade> Periodicidades { get; set; }




        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>().ToTable("Usuario");


            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<IdentityUserClaim<int>>()
            .HasOne<Usuario>()
            .WithMany()
            .HasForeignKey(uc => uc.UserId);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
