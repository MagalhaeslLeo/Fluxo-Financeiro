﻿using financas_negocios.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_negocios.Interface
{
    public interface INegocioUsuario
    {
        Task<UsuarioVO> AdicionarSalvar(UsuarioVO usuarioVO);

        Task<IEnumerable<UsuarioVO>> ObterTodos();

        Task<UsuarioVO> ObterPorID(int Id);

        Task<UsuarioVO> Atualizar(UsuarioVO usuarioVO);

        Task StatusDeletado(int Id);

    }
}
