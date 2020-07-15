using AuctionCenter.CORE.AppServices.HashingAppService;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Security.Policy;
using System.Text;

namespace AuctionCenter.CORE.AppServices.HashingAppService
{
    public class HashingAppService : IHashingAppService
    {
        private IConfiguration _config;

        public HashingAppService(IConfiguration config)
        {
            _config = config;
        }
        public string HashPassword(string password)
        {
            byte[] salt = Encoding.ASCII.GetBytes(_config["SALT"]);

            var hash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                   password: password,
                   salt: salt,
                   prf: KeyDerivationPrf.HMACSHA1,
                   iterationCount: 10000,
                   numBytesRequested: 256 / 8));
            return hash;
        }
    }
}
