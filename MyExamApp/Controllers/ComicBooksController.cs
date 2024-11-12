using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

public class ComicBookController : Controller
{
    private readonly ApplicationDbContext _context;

    public ComicBookController(ApplicationDbContext context)
    {
        _context = context;
    }

   
    public async Task<IActionResult> Index()
    {
        return View(await _context.ComicBooks.ToListAsync());
    }

    public IActionResult Create()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("BookName,Author,Price")] ComicBook comicBook)
    {
        if (ModelState.IsValid)
        {
            _context.Add(comicBook);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        return View(comicBook);
    }

    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var comicBook = await _context.ComicBooks.FindAsync(id);
        if (comicBook == null)
        {
            return NotFound();
        }
        return View(comicBook);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, [Bind("Id,BookName,Author,Price")] ComicBook comicBook)
    {
        if (id != comicBook.Id)
        {
            return NotFound();
        }

        if (ModelState.IsValid)
        {
            try
            {
                _context.Update(comicBook);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComicBookExists(comicBook.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return RedirectToAction(nameof(Index));
        }
        return View(comicBook);
    }

    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var comicBook = await _context.ComicBooks
            .FirstOrDefaultAsync(m => m.Id == id);
        if (comicBook == null)
        {
            return NotFound();
        }

        return View(comicBook);
    }

    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var comicBook = await _context.ComicBooks.FindAsync(id);
        _context.ComicBooks.Remove(comicBook);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }

    private bool ComicBookExists(int id)
    {
        return _context.ComicBooks.Any(e => e.Id == id);
    }

    public IActionResult Register()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register([Bind("Fullname,PhoneNumber,RegisterDate")] Customer customer)
    {
        if (ModelState.IsValid)
        {
            customer.RegisterDate = DateTime.Now; // Set default RegisterDate to current date
            _context.Add(customer);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        return View(customer);
    }

    public IActionResult RentBook()
    {
        ViewBag.ComicBooks = _context.ComicBooks.ToList();
        ViewBag.Customers = _context.Customers.ToList();
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> RentBook(int customerId, int comicBookId, DateTime rentalDate, DateTime returnDate, int quantity, decimal pricePerDay)
    {
        if (ModelState.IsValid)
        {
            var rental = new Rental
            {
                CustomerId = customerId,
                RentalDate = rentalDate,
                ReturnDate = returnDate,
                TotalPrice = quantity * pricePerDay // Tính tổng giá
            };
            _context.Add(rental);
            await _context.SaveChangesAsync();

            var rentalDetail = new RentalDetail
            {
                RentalId = rental.Id,
                ComicBookId = comicBookId,
                Quantity = quantity,
                PricePerDay = pricePerDay
            };
            _context.Add(rentalDetail);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        return View();
    }

    public async Task<IActionResult> RentalReport(DateTime startDate, DateTime endDate)
    {
        var rentals = await _context.Rentals
            .Where(r => r.RentalDate >= startDate && r.RentalDate <= endDate)
            .Include(r => r.Customer)
            .Include(r => r.RentalDetails)
            .ThenInclude(rd => rd.ComicBook)
            .ToListAsync();

        return View(rentals);
    }
}
