using financas_dominio.IdEntidade;

namespace financas_dominio.Entidade
{
    public class Perfil : EntidadeBase
    {
        public int IdPerfil { get; set; }
        public string Descricao { get; set; }
        public ICollection<Usuario> Usuarios { get; set; }
    }
}
