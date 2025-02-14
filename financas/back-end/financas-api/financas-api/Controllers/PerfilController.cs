using financas_negocios.Entidade;
using financas_negocios.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace financas_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerfilController : ControllerBase
    {
        protected readonly INegocioPerfil perfilNegocio;

        public PerfilController(INegocioPerfil negocio)
        {
            this.perfilNegocio = negocio;
        }

        [HttpGet]
        [Route("ObterTodosPerfis")]

        public async Task<IActionResult> ObterTodosPerfis()
        {
            try
            {
                var lPerfil = await perfilNegocio.ObterTodos();
                return Ok(lPerfil);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        [HttpGet]
        [Route("ObterPorId")]

        public async Task<IActionResult> ObterPorId([FromQuery] int pIdPerfil)
        {
            try
            {
                var lPerfil = await perfilNegocio.ObterPerfilPorId(pIdPerfil);

                return Ok(lPerfil);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

        }

        [HttpPost]
        [Route("PersistirPerfil")]

        public async Task<IActionResult> PersistirPerfil([FromBody] PerfilVO pPerfilVO)
        {
            try
            {

                if(pPerfilVO.Id > 0)
                {
                    await perfilNegocio.AtualizarPerfil(pPerfilVO);
                    return Ok();
                }

                await perfilNegocio.AdicionarSalvar(pPerfilVO);
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        [HttpDelete]
        [Route("ExcluirPerfil")]

        public async Task<IActionResult> ExcluirPerfil(int pIdPerfil)
        {
            try
            {
                await perfilNegocio.StatusDeletado(pIdPerfil);
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
