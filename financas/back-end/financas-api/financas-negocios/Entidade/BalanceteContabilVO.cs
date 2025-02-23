using financas_dominio.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_negocios.Entidade
{
    public class BalanceteContabilVO
    {
        public int IdBalancete { get; set; }
        public decimal TotalDespesa { get; set; }
        public decimal TotalReceita { get; set; }
        public decimal ResultadoGeral { get; set; }
        public string PeriodoInicial { get; set; }
        public string PeriodoFinal { get; set; }

        public ReceitaVO Receita { get; set; }
        public int IdReceita { get; set; }

        public DespesaVO Despesa { get; set; }
        public int IdDespesa { get; set; }

        public Periodicidade Periodicidade { get; set; }
        public int IdPeriodicidade { get; set; }
        public DateTime DataCriacao { get; set; }
        public bool Deletado { get; set; }
    }
}
