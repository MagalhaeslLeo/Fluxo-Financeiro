﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_negocios.Entidade
{
    public class ReceitaVO
    {
        public int Id { get; set; }
        public DateTime DataCriacao { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        public int IdFonteRendaVO { get; set; }
        public FonteRendaVO FonteRendaVO { get; set; }
        public int IdUsuarioVO { get; set; }
        public UsuarioVO UsuarioVO { get; set; }
    }
}
