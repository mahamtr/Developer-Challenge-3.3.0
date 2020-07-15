using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionCenter.CORE.AppServices
{
    public interface IEmailAppService
    {
        public void SendWelcomeEmail(string email);
        public void SendPurchase(string email);

    }
}
