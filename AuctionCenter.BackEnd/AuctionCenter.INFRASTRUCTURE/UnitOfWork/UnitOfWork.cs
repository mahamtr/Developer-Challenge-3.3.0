using AuctionCenter.CORE.Entities;
using AuctionCenter.CORE.InfrastructureCoupling;
using AuctionCenter.INFRASTRUCTURE.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionCenter.INFRASTRUCTURE.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        public IRepository<Users> Users { get; private set; }

        private readonly AuctionCenterDbContext _context;


        public UnitOfWork(AuctionCenterDbContext context)
        {
            _context = context;
            Users = new Repository<Users>(context);
        }

        public int Commit()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
