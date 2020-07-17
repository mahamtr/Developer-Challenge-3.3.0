using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionCenter.CORE.Entities
{
    public class SaleLogs
    {
        public int Id { get; set; }
        public string  ItemName{ get; set; }
        public decimal Price{ get; set; }
        public string Email { get; set; }
        public DateTime Date { get; set; }

    }
}
