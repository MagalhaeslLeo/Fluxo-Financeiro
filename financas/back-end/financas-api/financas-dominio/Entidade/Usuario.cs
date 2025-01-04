using financas_dominio.IdEntidade;

namespace financas_dominio.Entidade
{
    public class Usuario : EntidadeBase
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public Perfil Perfil { get; set; }
        public int IdPerfil { get; set; }
    }
}
