using financas_negocios.Entidade;
using financas_negocios.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace financas_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceitaController : ControllerBase
    {
        protected readonly INegocioReceita negocio;
        public ReceitaController(INegocioReceita negocioReceita)
        {
            this.negocio = negocioReceita;
        }

        [HttpGet]
        [Route("ObterTodasReceitas")]

        public async Task<IActionResult> ObterTodasReceitas()
        {
            try
            {
                var lReceita = await negocio.ObterTodos();
                return Ok(lReceita);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        [HttpGet]
        [Route("ObterPorId")]

        public async Task<IActionResult> ObterPorId([FromQuery] int pIdReceita)
        {
            try
            {
                var lDespesa = await negocio.ObterPorId(pIdReceita);

                return Ok(lDespesa);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        [HttpPost]
        [Route("PersistirReceita")]

        public async Task<IActionResult> PersistirReceita([FromBody] ReceitaVO pReceitaVO)
        {
            try
            {
                var lReceita = new ReceitaVO();

                if(pReceitaVO.Id > 0)
                {
                    lReceita = await negocio.Atualizar(pReceitaVO);
                    return Ok(lReceita);
                }

                lReceita = await negocio.AdicionarSalvar(pReceitaVO);
                return Ok(lReceita);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        [HttpDelete]
        [Route("ExcluirReceita")]

        public async Task<IActionResult> ExcluirReceita(int pIdReceita)
        {
            try
            {
                await negocio.StatusDeletado(pIdReceita);
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
