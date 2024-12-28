using financas_dominio.Entidade;
using financas_dominio.Interface;
using financas_repositorio.Contexto;

namespace financas_repositorio.Repositorio
{
    public class RepositorioUsuario : RepositorioBase<Usuario>, IRepositorioUsuario
    {
        public RepositorioUsuario(DbContexto contexto) : base(contexto) { }
    }
}

