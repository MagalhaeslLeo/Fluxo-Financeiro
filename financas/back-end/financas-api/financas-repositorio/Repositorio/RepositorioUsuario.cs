﻿using financas_dominio.Entidade;
using financas_dominio.Interface;
using financas_repositorio.Contexto;
using Microsoft.EntityFrameworkCore;

namespace financas_repositorio.Repositorio
{
    public class RepositorioUsuario : RepositorioBase<Usuario>, IRepositorioUsuario
    {
        public RepositorioUsuario(DbContexto contexto) : base(contexto) { }

        public async Task<IEnumerable<Usuario>> ObterUsuariosComPerfil()
        {
            try
            {
                return await contexto.Usuarios.Include(u=>u.Perfil)
                .Where(u=>!u.Deletado).ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<Usuario> ObterUsuarioPorID(int id)
        {
            try
            {
                var lUsuario = await contexto.Usuarios.Include(u => u.Perfil)
                .Where(u => !u.Deletado && u.Id == id).FirstOrDefaultAsync();

                return lUsuario;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}

