using AuctionCenter.CORE.Entities;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace AuctionCenter.CORE.AppServices.CheckoutAppService
{
    public interface ICheckoutAppService
    {
        public bool Checkout(string email,List<SaleItems> items);
    }
}
