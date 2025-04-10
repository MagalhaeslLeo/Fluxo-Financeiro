﻿using financas_negocios.Entidade;
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
        [Route("ObterPorId")]
        public async Task<IActionResult> ObterPorId([FromQuery] int pIdUsuario)
        {
            try
            {
                var lUsuario = await usuarioNegocio.ObterUsuarioPorID(pIdUsuario);

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
                if (pUsuarioVo.Id > 0)
                {
                    await usuarioNegocio.Atualizar(pUsuarioVo);
                    return Ok();
                }

                await usuarioNegocio.AdicionarSalvar(pUsuarioVo);
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        [HttpDelete]
        [Route("ExcluirUsuario")]

        public async Task<IActionResult> ExcluirUsuario(int pIdUsuario)
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
        [HttpGet]
        [Route("ObterUsuariosComPerfil")]

        public async Task<IActionResult> ObterUsuariosComPerfil() 
        {
            try
            {
                var lUsuarios = await usuarioNegocio.ObterUsuariosComPerfil();
                return Ok(lUsuarios);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        [HttpGet]
        [Route("ObterUsuarioPorID")]

        public async Task<IActionResult> ObterUsuarioPorID([FromQuery]int id)
        {
            try
            {
                var lUsuario = await usuarioNegocio.ObterUsuarioPorID(id);

                return Ok(lUsuario);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
