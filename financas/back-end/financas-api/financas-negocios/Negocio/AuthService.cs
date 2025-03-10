using financas_negocios.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace financas_negocios.Negocio
{
    public class AuthService : IAuthService
    {
		private readonly IConfiguration configuration;

        public AuthService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string GeradorJwtToken(string email, string senha)
        {
			try
			{
                var jwtSettings = configuration.GetSection("JwtSettings");
                var chave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));

                var credenciais = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, email)
                };

                var token = new JwtSecurityToken
                (
                   issuer: jwtSettings["Issuer"],
                   audience: jwtSettings["Audience"],
                   claims: claims,
                   expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpirationMinutes"])),
                   signingCredentials: credenciais
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
