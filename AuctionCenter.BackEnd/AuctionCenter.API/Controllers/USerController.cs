using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AuctionCenter.CORE.AppServices;
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
    public class UserController : ControllerBase
    {
        private IConfiguration _config;
        private IUserAppService _userAppService;

        public UserController(IConfiguration config, IUserAppService userAppService)
        {
            _config = config;
            _userAppService = userAppService;
        }
        [AllowAnonymous]
        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody]UserRequestInfo login)
        {
            IActionResult response;
            if (_userAppService.RegisterUser(login.Email, login.Password))
            {
                String tokenString = GenerateJWT(login);
                response = Ok(new { token = tokenString });
                return response;
            }
            return BadRequest("Email already Taken");
        }


        [AllowAnonymous]
        [Route("login")]
        [HttpGet]
        public IActionResult Login([FromQuery]UserRequestInfo login)
        {
            IActionResult response = Unauthorized();
            if (_userAppService.VerifyUser(login.Email, login.Password))
            {
                String tokenString = GenerateJWT(login);
                response = Ok(new { token = tokenString });
            }
            return response;
        }

    private string GenerateJWT(UserRequestInfo userInfo)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var header = new JwtHeader(credentials);
        var claims = new[] {
            new Claim("email",userInfo.Email),
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