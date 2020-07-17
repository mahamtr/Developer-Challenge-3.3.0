using AuctionCenter.CORE.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionCenter.CORE.AppServices
{
    public interface IEmailAppService
    {
        public void SendWelcomeEmail(string email);
        public void SendPurchaseEmail(string email,List<SaleItems> items);

    }
}
