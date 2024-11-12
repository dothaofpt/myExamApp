using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ComicBookRentalApp.Data;
using ComicBookRentalApp.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ComicBookRentalApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalDetailsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RentalDetailsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/rentaldetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RentalDetail>>> GetRentalDetails()
        {
            return await _context.RentalDetails.Include(rd => rd.Rental).Include(rd => rd.ComicBook).ToListAsync();
        }

        // GET: api/rentaldetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RentalDetail>> GetRentalDetail(int id)
        {
            var rentalDetail = await _context.RentalDetails.Include(rd => rd.Rental).Include(rd => rd.ComicBook).FirstOrDefaultAsync(rd => rd.RentalDetailID == id);

            if (rentalDetail == null)
            {
                return NotFound();
            }

            return rentalDetail;
        }

        // POST: api/rentaldetails
        [HttpPost]
        public async Task<ActionResult<RentalDetail>> PostRentalDetail(RentalDetail rentalDetail)
        {
            _context.RentalDetails.Add(rentalDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRentalDetail), new { id = rentalDetail.RentalDetailID }, rentalDetail);
        }

        // PUT: api/rentaldetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRentalDetail(int id, RentalDetail rentalDetail)
        {
            if (id != rentalDetail.RentalDetailID)
            {
                return BadRequest();
            }

            _context.Entry(rentalDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentalDetailExists(id))
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

        // DELETE: api/rentaldetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRentalDetail(int id)
        {
            var rentalDetail = await _context.RentalDetails.FindAsync(id);
            if (rentalDetail == null)
            {
                return NotFound();
            }

            _context.RentalDetails.Remove(rentalDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RentalDetailExists(int id)
        {
            return _context.RentalDetails.Any(e => e.RentalDetailID == id);
        }
    }
}
