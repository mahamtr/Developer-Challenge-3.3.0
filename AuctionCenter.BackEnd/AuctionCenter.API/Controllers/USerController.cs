using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AuctionCenter.CORE.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace AuctionCenter.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class USerController : ControllerBase
    {
        private IConfiguration _config;
        public USerController(IConfiguration config)
        {
            _config = config;
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Register([FromBody]UserRequestInfo login)
        {
            IActionResult response = Unauthorized();
            String tokenString = GenerateJWT(login);
            response = Ok(new { token = tokenString });
            return response;
        }


        [AllowAnonymous]
        [HttpGet]
        public IActionResult Login([FromBody]UserRequestInfo login)
        {
            IActionResult response = Unauthorized();
            String tokenString = GenerateJWT(login);
            response = Ok(new { token = tokenString });
            return response;
        }

        private string GenerateJWT(UserRequestInfo userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var header = new JwtHeader(credentials);
            var claims = new[] {
            new Claim("userName",userInfo.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
            var expiration = _config["JWT:ExpirationMins"];
            var payload = new JwtPayload(
                   issuer: _config["JWT:Issuer"],
                   audience: _config["JWT:Audience"],
                   claims: claims,
                   notBefore: DateTime.UtcNow,
                   expires: DateTime.UtcNow.AddMinutes(int.Parse(expiration))
               );

            var token = new JwtSecurityToken(
                    header,
                    payload
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}