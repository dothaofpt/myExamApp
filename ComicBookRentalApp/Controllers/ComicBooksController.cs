using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ComicBookRentalApp.Data;
using ComicBookRentalApp.Models;

namespace ComicBookRentalApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComicBooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ComicBooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/comicbooks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ComicBook>>> GetComicBooks()
        {
            return await _context.ComicBooks.ToListAsync();
        }

        // GET: api/comicbooks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ComicBook>> GetComicBook(int id)
        {
            var comicBook = await _context.ComicBooks.FindAsync(id);

            if (comicBook == null)
            {
                return NotFound();
            }

            return comicBook;
        }

        // POST: api/comicbooks
        [HttpPost]
        public async Task<ActionResult<ComicBook>> PostComicBook(ComicBook comicBook)
        {
            _context.ComicBooks.Add(comicBook);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetComicBook), new { id = comicBook.ComicBookID }, comicBook);
        }

        // PUT: api/comicbooks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComicBook(int id, ComicBook comicBook)
        {
            if (id != comicBook.ComicBookID)
            {
                return BadRequest();
            }

            _context.Entry(comicBook).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComicBookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/comicbooks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComicBook(int id)
        {
            var comicBook = await _context.ComicBooks.FindAsync(id);
            if (comicBook == null)
            {
                return NotFound();
            }

            _context.ComicBooks.Remove(comicBook);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ComicBookExists(int id)
        {
            return _context.ComicBooks.Any(e => e.ComicBookID == id);
        }
    }
}
