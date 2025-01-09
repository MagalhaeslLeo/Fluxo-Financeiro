using financas_negocios.Entidade;
using financas_negocios.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace financas_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DespesaController : ControllerBase
    {
        protected readonly INegocioDespesa negocio;
        public DespesaController(INegocioDespesa despesaNegocio)
        {
            this.negocio = despesaNegocio;
        }

        [HttpGet]
        [Route("ObterTodasDespesas")]

        public async Task<IActionResult> ObterTodasDespesas()
        {
            try
            {
                var lDespesa = await negocio.ObterTodos();
                return Ok(lDespesa);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        [HttpGet]
        [Route("ObterPorId")]

        public async Task<IActionResult> ObterPorId([FromQuery] int pIdDespesa)
        {
            try
            {
                var lDespesa = await negocio.ObterPorId(pIdDespesa);

                return Ok(lDespesa);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

        }

        [HttpPost]
        [Route("PersistirDespesa")]

        public async Task<IActionResult> PersistirDespesa([FromBody] DespesaVO pDespesaVO)
        {
            try
            {
                var lDespesa = new DespesaVO();

                if (pDespesaVO.Id > 0)
                {
                    lDespesa = await negocio.Atualizar(pDespesaVO);
                    return Ok(lDespesa);
                }

                lDespesa = await negocio.AdicionarSalvar(pDespesaVO);
                return Ok(lDespesa);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        [HttpDelete]
        [Route("ExcluirDespesa")]

        public async Task<IActionResult> ExcluirDespesa(int pIdDespesa)
        {
            try
            {
                await negocio.StatusDeletado(pIdDespesa);
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
