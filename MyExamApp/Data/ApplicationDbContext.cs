using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public DbSet<ComicBook> ComicBooks { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Rental> Rentals { get; set; }
    public DbSet<RentalDetail> RentalDetails { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ComicBook>()
            .Property(c => c.PricePerDay)
            .HasColumnType("decimal(18,2)");  // Định nghĩa kiểu dữ liệu SQL cho PricePerDay

        modelBuilder.Entity<RentalDetail>()
            .Property(r => r.PricePerDay)
            .HasColumnType("decimal(18,2)");  // Định nghĩa kiểu dữ liệu SQL cho PricePerDay
    }
}
