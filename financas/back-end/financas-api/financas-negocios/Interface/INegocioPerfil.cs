﻿using financas_negocios.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_negocios.Interface
{
    public interface INegocioPerfil
    {
        Task<PerfilVO> AdicionarSalvar(PerfilVO perfilVO);
        Task<IEnumerable<PerfilVO>> ObterTodos();
        Task<PerfilVO> Atualizar(PerfilVO perfilVO);
        Task<PerfilVO> ObterPorId(int Id);
        Task StatusDeletado(int Id);
    }
}