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
        protected readonly INegocioUsuario usuarioNegocio;
        public UsuarioController(INegocioUsuario negocio)
        {
            this.usuarioNegocio = negocio;
        }

        [HttpGet("ObterTodos")]
        public async Task<IEnumerable<UsuarioVO>> ObterTodos()
        {
            try
            {
                var listaUsuario = await usuarioNegocio.ObterTodos();
                return listaUsuario;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        [HttpGet("teste")]
        public async Task<UsuarioVO> teste()
        {
            try
            {
                UsuarioVO listaUsuario = new UsuarioVO();
                listaUsuario.Nome = "TESTE";
                return listaUsuario;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
