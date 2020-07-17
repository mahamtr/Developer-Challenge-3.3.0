using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionCenter.CORE.Entities
{
    public class SaleItems
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int ZipCode{ get; set; }
        public string Image { get; set; }
    }
}
