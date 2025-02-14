using financas_negocios.Entidade;
using financas_negocios.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace financas_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FonteRendaController : ControllerBase
    {
        protected readonly INegocioFonteRenda negocio;
        public FonteRendaController(INegocioFonteRenda negocio)
        {
            this.negocio = negocio;
        }
        [HttpGet]
        [Route("ObterTodasFonteRendas")]

        public async Task<IActionResult> ObterTodasFonteRendas()
        {
            try
            {
                var lFonteRenda = await negocio.ObterTodos();
                return Ok(lFonteRenda);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        [HttpGet]
        [Route("ObterPorId")]
        public async Task<IActionResult> ObterPorId([FromQuery] int pIdFonteRenda)
        {
            try
            {
                var lFonteRenda = await negocio.ObterFonteRendaPorId(pIdFonteRenda);
                return Ok(lFonteRenda);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

        }

        [HttpPost]
        [Route("PersistirFonteRenda")]
        public async Task<IActionResult> PersistirFonteRenda([FromBody] FonteRendaVO pFonteRendaVO)
        {
            try
            {
                if(pFonteRendaVO.Id > 0)
                {
                    await negocio.AtualizarFonteRenda(pFonteRendaVO);
                    return Ok();
                }
                await negocio.AdicionarSalvar(pFonteRendaVO);
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
        [HttpDelete]
        [Route("ExcluirFonteRenda")]
        public async Task<IActionResult> ExcluirFonteRenda(int pIdFonteRenda)
        {
            try
            {
                await negocio.StatusDeletado(pIdFonteRenda);
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
