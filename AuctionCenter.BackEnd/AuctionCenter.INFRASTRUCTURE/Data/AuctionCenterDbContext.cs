using Ardalis.EFCore.Extensions;
using AuctionCenter.CORE.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionCenter.INFRASTRUCTURE.Data
{
    public class AuctionCenterDbContext : DbContext
    {
        public AuctionCenterDbContext(DbContextOptions<AuctionCenterDbContext> options) : base(options)
        {

        }

        public DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyAllConfigurationsFromCurrentAssembly();
            modelBuilder.Entity<Users>().ToTable("Users").HasKey("Id");
            modelBuilder.Entity<SaleItems>().ToTable("SaleItems").HasKey("Id");

        }



        public override int SaveChanges()
        {
            return SaveChangesAsync().GetAwaiter().GetResult();
        }
    }

}
