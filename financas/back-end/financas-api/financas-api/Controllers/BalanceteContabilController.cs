using financas_negocios.Entidade;
using financas_negocios.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace financas_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BalanceteContabilController : ControllerBase
    {
        protected readonly INegocioBalanceteContabil negocio;

        public BalanceteContabilController(INegocioBalanceteContabil balanceteNegocio)
        {
            this.negocio = balanceteNegocio;
        }
        [HttpGet]
        [Route("ObterBalanceteContabilPorPeriodo")]
        public async Task<IActionResult> ObterBalanceteContabilPorPeriodo(string pPeriodicidade)
        {
            try
            {
                var lBalancete = await negocio.ObterBalanceteContabilPorPeriodo(pPeriodicidade);
                return Ok(lBalancete);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
        [HttpGet]
        [Route("ObterTodos")]
        public async Task<IActionResult> ObterTodos()
        {
            try
            {
                var lBalancete = await negocio.ObterTodos();
                return Ok(lBalancete);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }

        }
        [HttpGet]
        [Route("ObterPorId")]
        public async Task<IActionResult> ObterPorId([FromQuery] int pIdBalancete)
        {
            try
            {
                var balancete = await negocio.ObterBalanceteContabilPorId(pIdBalancete);
                return Ok(balancete);
            }
            
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
        [HttpPost]
        [Route("PersistirBalancete")]
        public async Task<IActionResult> PersistirBalancete([FromBody] BalanceteContabilVO pBalanceteVO) 
        {
            try
            {
                if (pBalanceteVO.IdBalancete > 0)
                {
                    await negocio.AtualizarBalanceteContabil(pBalanceteVO);
                    return Ok();
                }

                await negocio.AdicionarSalvar(pBalanceteVO);
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
        [HttpGet]
        [Route("ResultadoBalanceteContabil")]
        public async Task<IActionResult> ResultadoBalanceteContabil(string pInicial, string pFinal, string pPeriodicidade)
        {
            try
            {
                var calculo = await negocio.ResultadoBalanceteContabil(pInicial, pFinal, pPeriodicidade);
                return Ok(calculo);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }


        [HttpDelete]
        [Route("ExcluirBalancete")]
        public async Task<IActionResult> ExcluirBalancete(int pIdBalancete)
        {
            try
            {
                await negocio.StatusDeletado(pIdBalancete);
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
