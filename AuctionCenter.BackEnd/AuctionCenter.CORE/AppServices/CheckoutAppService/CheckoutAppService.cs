using AuctionCenter.CORE.Entities;
using AuctionCenter.CORE.InfrastructureCoupling;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace AuctionCenter.CORE.AppServices.CheckoutAppService
{
    public class CheckoutAppService : ICheckoutAppService
    {
        private IUnitOfWork _unitOfWork;
        private IEmailAppService _emailAppService;

        public CheckoutAppService(IUnitOfWork unitOf,IEmailAppService emailAppService)
        {
            _unitOfWork = unitOf;
            _emailAppService = emailAppService;
        }
        public bool Checkout(string email,List<SaleItems> items)
        {
            try
            {
                var saleLogs = new List<SaleLogs>();
                foreach(var item in items)
                {
                    var saleLog = new SaleLogs
                    {
                        ItemName = item.ItemName,
                        Date = DateTime.Now,
                        Email = email,
                        Price = item.Price
                    };
                    saleLogs.Add(saleLog);
                }
                _emailAppService.SendPurchaseEmail(email.Trim(), items);
                //_unitOfWork.SaleItems.RemoveRange(items);
                _unitOfWork.SaleLogs.AddRange(saleLogs);
                _unitOfWork.Commit();

                return true;


            }
            catch (Exception)
            {

                throw new Exception("sorry, something wrong happend");
            }
         

        }
    }
}
