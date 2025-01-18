using financas_dominio.Entidade;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace financas_repositorio.Contexto
{
    public class DbContexto: DbContext
    {
        public DbContexto(DbContextOptions<DbContexto> options ) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Perfil> Perfis { get; set; }
        public DbSet<Despesa> Despesas { get; set; }
        public DbSet<Receita> Receitas { get; set; }
        public DbSet<Cartao> Cartoes { get; set; }
        public DbSet<TipoPagamento> TipoPagamentos { get; set; }
        public DbSet<FonteRenda> FonteRendas { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
