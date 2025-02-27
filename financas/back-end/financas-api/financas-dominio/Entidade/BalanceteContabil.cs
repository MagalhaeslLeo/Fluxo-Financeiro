using financas_dominio.IdEntidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_dominio.Entidade
{
    public class BalanceteContabil : EntidadeBase
    {
        public int IdBalancete { get; set; }
        public decimal TotalDespesa { get; set; }
        public decimal TotalReceita { get; set; }
        public decimal ResultadoGeral { get; set; }
        public string PeriodoInicial { get; set; }
        public string PeriodoFinal { get; set; }

        public string DespesaDescricao { get; set; }
        public string ReceitaDescricao { get; set; }
        public string PeriodicidadeDescricao { get; set; }


        public Receita Receita { get; set; }
        public int IdReceita { get; set; }

        public Despesa Despesa { get; set; }
        public int IdDespesa { get; set; }

        public Periodicidade Periodicidade { get; set; }
        public int IdPeriodicidade { get; set; }
    }
}
