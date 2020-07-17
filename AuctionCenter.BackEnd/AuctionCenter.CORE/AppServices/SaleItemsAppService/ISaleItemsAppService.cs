using AuctionCenter.CORE.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionCenter.CORE.AppServices.SaleItemsAppService
{
    public interface ISaleItemsAppService
    {
        public List<SaleItems> GetAllSaleItems();
        public List<SaleItems> GetSaleItemsByCategory(string category);

    }
}
