using Microsoft.AspNetCore.Mvc;
using MyExamApp.Data;
using MyExamApp.Models;
using System.Linq;
using System.Threading.Tasks;

public class ComicBooksController : Controller {
    private readonly ApplicationDbContext _context;

    public ComicBooksController(ApplicationDbContext context) {
        _context = context;
    }

   
    public async Task<IActionResult> Index() {
        return View(await _context.ComicBooks.ToListAsync());
    }

       public async Task<IActionResult> Details(int? id) {
        if (id == null) {
            return NotFound();
        }

        var comicBook = await _context.ComicBooks
            .FirstOrDefaultAsync(m => m.ComicBookID == id);
        if (comicBook == null) {
            return NotFound();
        }

        return View(comicBook);
    }


    public IActionResult Create() {
        return View();
    }

    
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("ComicBookID,Title,Author,PricePerDay")] ComicBook comicBook) {
        if (ModelState.IsValid) {
            _context.Add(comicBook);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        return View(comicBook);
    }

    
    public async Task<IActionResult> Edit(int? id) {
        if (id == null) {
            return NotFound();
        }

        var comicBook = await _context.ComicBooks.FindAsync(id);
        if (comicBook == null) {
            return NotFound();
        }
        return View(comicBook);
    }

    
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, [Bind("ComicBookID,Title,Author,PricePerDay")] ComicBook comicBook) {
        if (id != comicBook.ComicBookID) {
            return NotFound();
        }

        if (ModelState.IsValid) {
            try {
                _context.Update(comicBook);
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!ComicBookExists(comicBook.ComicBookID)) {
                    return NotFound();
                } else {
                    throw;
                }
            }
            return RedirectToAction(nameof(Index));
        }
        return View(comicBook);
    }

 
    public async Task<IActionResult> Delete(int? id) {
        if (id == null) {
            return NotFound();
        }

        var comicBook = await _context.ComicBooks
            .FirstOrDefaultAsync(m => m.ComicBookID == id);
        if (comicBook == null) {
            return NotFound();
        }

        return View(comicBook);
    }

    
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id) {
        var comicBook = await _context.ComicBooks.FindAsync(id);
        _context.ComicBooks.Remove(comicBook);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }

    private bool ComicBookExists(int id) {
        return _context.ComicBooks.Any(e => e.ComicBookID == id);
    }
}
