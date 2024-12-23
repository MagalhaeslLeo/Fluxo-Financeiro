using financas_negocios.Entidade;
using financas_negocios.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace financas_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        protected readonly INegocioUsuario negocio;
        public UsuarioController(INegocioUsuario negocio)
        {
            this.negocio = negocio;
        }

        [HttpGet("ObterTodos")]
        public async Task<IEnumerable<UsuarioVO>> ObterTodos()
        {
            try
            {
                var listaUsuario = await negocio.ObterTodos();
                return listaUsuario;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
