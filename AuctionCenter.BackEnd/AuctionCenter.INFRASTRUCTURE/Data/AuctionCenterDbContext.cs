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
        public DbSet<SaleItems> SaleItems { get; set; }
        public DbSet<SaleLogs> SaleLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyAllConfigurationsFromCurrentAssembly();
            modelBuilder.Entity<Users>().ToTable("Users").HasKey("Id");
            modelBuilder.Entity<SaleItems>().ToTable("SaleItems").HasKey("Id");
            modelBuilder.Entity<SaleLogs>().ToTable("SaleLogs").HasKey("Id");

        }



        public override int SaveChanges()
        {
            return SaveChangesAsync().GetAwaiter().GetResult();
        }
    }

}
