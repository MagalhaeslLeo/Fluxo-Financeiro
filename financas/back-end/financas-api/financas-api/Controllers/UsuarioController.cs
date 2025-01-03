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

        [HttpGet]
        [Route("ObterTodosUsuarios")]
        public async Task<IActionResult> ObterTodosUsuarios()
        {
            try
            {
                var listaUsuario = await usuarioNegocio.ObterTodos();
                return Ok(listaUsuario);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        [HttpGet]
        [Route("ObterUsuarioPorId")]
        public async Task<IActionResult> ObterUsuarioPorId([FromQuery] int pIdUsuario)
        {
            try
            {
                var lUsuario = await usuarioNegocio.ObterPorID(pIdUsuario);

                return Ok(lUsuario);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        [HttpPost]
        [Route("PersistirUsuario")]

        public async Task<IActionResult> PersistirUsuario([FromBody] UsuarioVO pUsuarioVo)
        {
            try
            {
                var lUsuario = new UsuarioVO();

                if (pUsuarioVo.Id > 0)
                {
                    lUsuario = await usuarioNegocio.Atualizar(pUsuarioVo);
                    return Ok(lUsuario);
                }

                lUsuario = await usuarioNegocio.AdicionarSalvar(pUsuarioVo);
                return Ok(lUsuario);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        [HttpPost]
        [Route("ExcluirUsuario/pIdUsuario:int")]

        public async Task<IActionResult> ExcluirUsuario([FromRoute] int pIdUsuario)
        {
            try
            {
                await usuarioNegocio.StatusDeletado(pIdUsuario);
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
