using financas_dominio.Entidade;
using financas_dominio.Interface;
using financas_repositorio.Contexto;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace financas_repositorio.Repositorio
{
    public class RepositorioUsuario : IRepositorioUsuario
    {
        private readonly SignInManager<Usuario> gerenciadorLogin;

        private readonly DbContexto contexto;

        public RepositorioUsuario(DbContexto contexto, SignInManager<Usuario> gerenciadorLogin)
        {
            this.contexto = contexto;
            this.gerenciadorLogin = gerenciadorLogin;            
        }

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
                .Where(u => !u.Deletado && u.IdUsuario == id).FirstOrDefaultAsync();

                return lUsuario;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<Usuario> Atualizar(Usuario usuario)
        {
            try
            {
                var atualizaEntidade = await contexto.Usuarios.SingleOrDefaultAsync(e => e.IdUsuario.Equals(usuario.IdUsuario));

                if (atualizaEntidade == null)
                {
                    return null;
                }
                contexto.Entry(atualizaEntidade).CurrentValues.SetValues(usuario);
                await contexto.SaveChangesAsync();
                return usuario;
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }

        public async Task<Usuario> ObterUsuarioPorEmailSenha(string email, string senha)
        {
            try
            {
                var usuario = await contexto.Usuarios
                .Include(u =>u.Perfil)
                .FirstOrDefaultAsync(u => u.Email == email && u.Senha == senha && !u.Deletado);

                return usuario;
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }

        public IQueryable<Usuario> Queryable()
        {
            try
            {
                return contexto.Usuarios.AsQueryable();
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }

        public async Task Commit()
        {
            try
            {
                await contexto.SaveChangesAsync();
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }

        public void Adicionar(Usuario entidade)
        {
            try
            {
                contexto.Usuarios.Add(entidade);
            }
            catch (Exception exception)
            {
                throw new Exception(exception.Message, exception);
            }
        }

        public async Task<Usuario> AdicionarSalvar(Usuario entidade)
        {
            try
            {
                contexto.Usuarios.Add(entidade);
                await contexto.SaveChangesAsync();
                return entidade;
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }

        public async Task<IEnumerable<Usuario>> ObterTodos()
        {
            try
            {
                return await contexto.Usuarios.ToListAsync();

            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }

        public async Task StatusDeletado(Usuario entidade)
        {
            try
            {
                await contexto.SaveChangesAsync();
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }
        public async Task LogarUsuario(Usuario usuario, bool lembrar)
        {
            try
            {
                await gerenciadorLogin.SignInAsync(usuario, false);
            }
            catch (Exception expection)
            {

                throw new Exception(expection.Message, expection);
            }
        }
    }
}

