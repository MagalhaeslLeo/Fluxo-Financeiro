using financas_negocios.Entidade;
using financas_negocios.Interface;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace financas_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        protected readonly INegocioUsuario negocioUsuario;
        public HomeController(INegocioUsuario negocio)
        {
            this.negocioUsuario = negocio;
        }

        [HttpGet]
        [Route("Login")]
        public IActionResult Login()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Login(int pIdUsuario)
        {
            var lUsuario = await negocioUsuario.ObterUsuarioPorID(pIdUsuario);

            //string token = GeradorToken(lUsuario);

            //Define o Token em cookie de autenticação
            var claims = new List<Claim>
         {
            new Claim("id", lUsuario.Id.ToString()),
            new Claim(ClaimTypes.Name, lUsuario.Nome),
            new Claim("email", lUsuario.Email)
         };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var authenticateProprieties = new AuthenticationProperties
            {
                IsPersistent = true,
                ExpiresUtc = DateTime.UtcNow.AddMinutes(30)
            };

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity), authenticateProprieties);

            return Ok(lUsuario);
        }
        public string GeradorToken(UsuarioVO usuarioVO)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] Chave = Encoding.ASCII.GetBytes("fedaf7d8863b48e197b9287d492b708e");

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                 new Claim("id", usuarioVO.Id.ToString()),
                 new Claim("nomeUsuario", usuarioVO.Nome),
                 new Claim("email", usuarioVO.Email)
                }),

                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Chave), SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        public async Task<IActionResult> Deslogar()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Login");
        }
    }
}
