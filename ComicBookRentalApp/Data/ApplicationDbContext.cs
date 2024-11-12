using Microsoft.EntityFrameworkCore;
using ComicBookRentalApp.Models;

namespace ComicBookRentalApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<ComicBook> ComicBooks { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Rental> Rentals { get; set; }
        public DbSet<RentalDetail> RentalDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<RentalDetail>()
                .HasOne(rd => rd.ComicBook)
                .WithMany()
                .HasForeignKey(rd => rd.ComicBookID);

            modelBuilder.Entity<RentalDetail>()
                .HasOne(rd => rd.Rental)
                .WithMany()
                .HasForeignKey(rd => rd.RentalID);
        }
    }
    
}
