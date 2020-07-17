using AuctionCenter.CORE.Entities;
using AuctionCenter.CORE.InfrastructureCoupling;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AuctionCenter.CORE.AppServices.SaleItemsAppService
{
    public class SaleItemsAppService : ISaleItemsAppService
    {
        private IUnitOfWork _unitOfWork;

        public SaleItemsAppService(IUnitOfWork unitofWork)
        {
            _unitOfWork = unitofWork;
        }
        public List<SaleItems> GetAllSaleItems()
        {
            return _unitOfWork.SaleItems.GetAll().ToList();
        }

        public List<SaleItems> GetSaleItemsByCategory(string category)
        {
            return _unitOfWork.SaleItems.GetFiltered(i => i.Category == category).ToList();
        }
    }
}
