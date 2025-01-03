using Currency_Converter.Server.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Currency_Converter.Server.Controllers
{
	[Route("[controller]")]
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

		// DELETE api/<CartController>/5
		[HttpDelete("{id}")]
		public IActionResult Delete(string id)
		{
			try
			{
				Carts.CartsOnFile.Remove(Carts.CartsOnFile.FirstOrDefault(e => e.id == id));
				return Ok(id);
			}
			catch
			{
				return BadRequest("Could not find the specified cart");
			}
		}
	}
}
