﻿using financas_dominio.Entidade;
using financas_dominio.Interface;
using financas_repositorio.Contexto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_repositorio.Repositorio
{
    public class RepositorioDespesa : RepositorioBase<Despesa>, IRepositorioDespesa
    {
        public RepositorioDespesa(DbContexto contexto) : base(contexto)
        {
        }
    }
}