﻿using financas_dominio.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_negocios.Entidade
{
    public class TipoPagamentoVO
    {
        public int IdTipoPagamentoVO { get; set; }
        public DateTime DataCriacao { get; set; }
        public string Descricao { get; set; }
        public bool Deletado { get; set; }
        public ICollection<DespesaVO> DespesasVO { get; set; }

    }
}
