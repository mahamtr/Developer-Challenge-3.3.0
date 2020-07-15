using AuctionCenter.CORE.InfrastructureCoupling;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace AuctionCenter.INFRASTRUCTURE.Data
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly AuctionCenterDbContext _auctionCenterDbContext;
        public Repository(AuctionCenterDbContext auctionCenterDbContext)
        {
            _auctionCenterDbContext = auctionCenterDbContext;
        }
        public TEntity GetById(int id)
        {
            return _auctionCenterDbContext.Set<TEntity>().Find(id);
        }
        public IEnumerable<TEntity> GetAll()
        {
            return _auctionCenterDbContext.Set<TEntity>();
        }
        public IEnumerable<TEntity> GetFiltered(Expression<Func<TEntity, bool>> predicate)
        {
            return _auctionCenterDbContext.Set<TEntity>().Where(predicate);
        }

        public void Add(TEntity entity)
        {
            _auctionCenterDbContext.Set<TEntity>().Add(entity);
        }
        public void AddRange(IEnumerable<TEntity> entity)
        {
            _auctionCenterDbContext.Set<TEntity>().AddRange(entity);
        }

        public void Remove(TEntity entity)
        {
            _auctionCenterDbContext.Set<TEntity>().Remove(entity);
        }
        public void RemoveRange(IEnumerable<TEntity> entity)
        {
            _auctionCenterDbContext.Set<TEntity>().RemoveRange(entity);
        }
    }
}
