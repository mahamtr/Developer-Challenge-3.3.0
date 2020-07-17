using AuctionCenter.CORE.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionCenter.CORE.InfrastructureCoupling
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Users> Users { get; }
        IRepository<SaleItems> SaleItems{ get; }
        IRepository<SaleLogs> SaleLogs { get; }


        int Commit();

    }
}
