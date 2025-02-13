using financas_dominio.Entidade;
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
    public class RepositorioReceita : RepositorioBase<Receita>, IRepositorioReceita
    {
        public RepositorioReceita(DbContexto contexto) : base(contexto)
        {
        }

        public async Task<Receita> AtualizarReceita(Receita receita)
        {
            try
            {
                var atualizaEntidade = await contexto.Receitas.SingleOrDefaultAsync(e => e.IdReceita.Equals(receita.IdReceita));

                if (atualizaEntidade == null)
                {
                    return null;
                }
                contexto.Entry(atualizaEntidade).CurrentValues.SetValues(receita);
                await contexto.SaveChangesAsync();
                return receita;
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }

        public async Task<Receita> ObterReceitaPorId(int id)
        {
            try
            {
                return await contexto.Receitas.Include(r=>r.FonteRenda).SingleOrDefaultAsync(e => e.IdReceita.Equals(id));
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }

        public async Task<IEnumerable<Receita>> ObterTodasReceitasComFontesRendas()
        {
            try
            {
                var listaReceita = await contexto.Receitas
                .Include(r =>r.FonteRenda)
                .ToListAsync();
                return listaReceita;
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message, exception);

            }
        }
    }
}
