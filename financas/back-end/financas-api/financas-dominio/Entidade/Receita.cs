﻿using financas_dominio.IdEntidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_dominio.Entidade
{
    public class Receita : EntidadeBase
    {
        public string Descricao { get; set; }
        public decimal Valor { get; set; }

        public int IdUsuario { get; set; }
        public Usuario Usuario { get; set; }
    }
}
