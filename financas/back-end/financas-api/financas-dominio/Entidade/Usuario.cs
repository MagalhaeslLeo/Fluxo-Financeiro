using financas_dominio.IdEntidade;
using Microsoft.AspNetCore.Identity;

namespace financas_dominio.Entidade
{
    public class Usuario : IdentityUser<int>
    {
        public int IdUsuario { get; set; }

        public string Nome { get; set; }
        override public string Email { get; set; }
        public string Senha { get; set; }
        public Perfil Perfil { get; set; }
        public int IdPerfil { get; set; }
        public DateTime DataCriacao { get; set; } = DateTime.Now;
        public bool Deletado { get; set; }


        public ICollection<Despesa> Despesas { get; set; }
        public ICollection<Receita> Receitas { get; set; }

    }
}
