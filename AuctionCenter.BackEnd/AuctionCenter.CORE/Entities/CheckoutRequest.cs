using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionCenter.CORE.Entities
{
    public class CheckoutRequest
    {
        public List<SaleItems> Items { get; set; }
        public string Email { get; set; }

    }

}
