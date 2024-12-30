using Currency_Converter.Server.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Currency_Converter.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CartController : ControllerBase
	{

		// GET api/<CartController>/5
		[HttpGet("{id}")]
		public Cart Get(string id)
		{
			return Carts.CartsOnFile.FirstOrDefault(e => e.id == id) ?? throw new Exception("Cart Not found");
		}

		// POST api/<CartController>
		[HttpPost]
		public IActionResult Post([FromBody] Cart cart)
		{
			try
			{
				Carts.CartsOnFile.Add(cart);
				return Ok(cart.id);
			}
			catch
			{
				return BadRequest("Check your cart structure");
			}
		}

		// PUT api/<CartController>/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		// DELETE api/<CartController>/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}
