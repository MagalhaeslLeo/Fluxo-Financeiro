using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_dominio.Entidade
{
    public class Periodicidade 
    {
        public int IdPeriodicidade { get; set; }
        public string Descricao { get; set; }
        public ICollection<BalanceteContabil> Balancetes { get; set; } = new List<BalanceteContabil>();

    }
}
