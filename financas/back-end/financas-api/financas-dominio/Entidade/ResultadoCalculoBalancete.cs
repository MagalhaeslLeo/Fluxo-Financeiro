using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_dominio.Entidade
{
    public class ResultadoCalculoBalancete
    {
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set;}
        public decimal ResultadoGeral { get; set;}
        public string PeriodoInicial { get; set; }
        public string PeriodoFinal { get; set; }
    }
}
