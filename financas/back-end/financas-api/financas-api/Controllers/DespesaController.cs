﻿using financas_negocios.Entidade;
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
                var lDespesa = await negocio.ObterDespesasComTiposPagamentos();
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
                var lDespesa = await negocio.ObterDespesaPorId(pIdDespesa);

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
                if (pDespesaVO.Id > 0)
                {
                    await negocio.AtualizarDespesa(pDespesaVO);
                    return Ok();
                }

                await negocio.AdicionarSalvar(pDespesaVO);
                return Ok();
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

        [HttpGet]
        [Route("ObterTiposPagamentos")]

        public async Task<IActionResult> ObterTiposPagamentos()
        {
            var lTipoPagamento = await negocio.ObterTiposPagamentos();
            return Ok(lTipoPagamento);
        }
    }
}
