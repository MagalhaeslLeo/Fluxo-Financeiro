﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_negocios.Entidade
{
    public class UsuarioVO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public int IdPerfil { get; set; }
        public string Senha { get; set; }
        public DateTime DataCriacao { get; set; }
        public bool Deletado { get; set; }
    }
}
