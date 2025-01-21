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
    public class RepositorioFonteRenda : RepositorioBase<FonteRenda>, IRepositorioFonteRenda
    {
        public RepositorioFonteRenda(DbContexto contexto) : base(contexto) { }

        public async Task<FonteRenda> AtualizarFonteRenda(FonteRenda fonteRenda)
        {
            try
            {
                var atualizaEntidade = await contexto.FonteRendas.SingleOrDefaultAsync(e => e.IdFonteRenda.Equals(fonteRenda.IdFonteRenda));

                if (atualizaEntidade == null)
                {
                    return null;
                }
                contexto.Entry(atualizaEntidade).CurrentValues.SetValues(fonteRenda);
                await contexto.SaveChangesAsync();
                return fonteRenda;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<FonteRenda> ObterFonteRendaPorId(int id)
        {
            try
            {
                return await contexto.FonteRendas.SingleOrDefaultAsync(e => e.IdFonteRenda.Equals(id));

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
