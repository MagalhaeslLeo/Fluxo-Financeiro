using financas_dominio.IdEntidade;
using financas_dominio.Interface;
using financas_repositorio.Contexto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace financas_repositorio.Repositorio
{
    public class RepositorioBase<T> : IRepositorioBase<T> where T : EntidadeBase
    {
        protected readonly DbContexto contexto;
        protected DbSet<T> dbSet;
        public RepositorioBase(DbContexto contexto)
        {
            this.contexto = contexto;
            this.dbSet = contexto.Set<T>();
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
        public IQueryable<T> Queryable()
        {
            return dbSet as IQueryable<T>;
        }
        public void Adicionar(T entidade)
        {
            try
            {
                dbSet.Add(entidade);
            }
            catch (Exception exception)
            {
                throw new Exception(exception.Message, exception);
            }
        }

        public async Task<T> AdicionarSalvar(T entidade)
        {
            try
            {

                dbSet.Add(entidade);
                await contexto.SaveChangesAsync();
                return entidade;
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }

        public async Task<IEnumerable<T>> ObterTodos()
        {
            try
            {
                return await dbSet.ToListAsync();
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }
        public async Task StatusDeletado(T entidade)
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

    }
}

