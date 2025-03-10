using financas_negocios.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace financas_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IAuthService service;
        private readonly INegocioUsuario negocio;
        public LoginController(IAuthService service, INegocioUsuario negocio)
        {
            this.service = service;
            this.negocio = negocio;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] string email, string senha)
        {
            var usuario = await negocio.ObterUsuarioPorEmailSenha(email, senha);

            if (usuario != null)
            {
                var token = service.GeradorJwtToken(email, senha);
                return Ok(new { Token = token });
            }
            return Unauthorized("Usuário ou senha inválidos");
        }
    }
}
