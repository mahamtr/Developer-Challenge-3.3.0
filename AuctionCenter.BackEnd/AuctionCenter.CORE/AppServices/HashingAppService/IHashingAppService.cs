using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionCenter.CORE.AppServices.HashingAppService
{
    public interface IHashingAppService
    {
        public string HashPassword(string password);
    }
}
