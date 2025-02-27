﻿using financas_dominio.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_dominio.Interface
{
    public interface IRepositorioBalanceteContabil : IRepositorioBase<BalanceteContabil>
    {
        Task<IEnumerable<BalanceteContabil>> ObterBalanceteContabilPorPeriodo(string pPeriodicidade);
        Task<BalanceteContabil> ObterBalanceteContabilPorId(int id);

        Task<BalanceteContabil> AtualizarBalanceteContabil(BalanceteContabil balancete);
    }
}
