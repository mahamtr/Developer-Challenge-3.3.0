using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionCenter.CORE.AppServices
{
    public interface IUserAppService
    {
        public bool VerifyUser(string email, string password);
        public bool RegisterUser(string email, string password);
    }
}
