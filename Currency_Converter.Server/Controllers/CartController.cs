using Currency_Converter.Server.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Currency_Converter.Server.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class CartController : ControllerBase
	{

		// GET api/<CartController>/5
		[HttpGet]
		[Route("{id}")]
		public ActionResult<Cart> Get(string id)
		{
			return Carts.CartsOnFile.FirstOrDefault(e => e.id == id) ?? throw new Exception("Cart Not found");
		}

		// POST api/<CartController>
		[HttpPost]
		public IActionResult Post([FromBody] Cart cart)
		{
			try
			{
				Carts.CartsOnFile.ForEach((c) => { if (c.id == cart.id) throw new Exception("Cart already exists"); });
				foreach (var item in cart.items)
				{
					if(item.currency != cart.items[0].currency)
					{
						throw new Exception("your cart needs to have the same currency for all items");
					}
				}
				Carts.CartsOnFile.Add(cart);
				return Ok(cart.id);
			}
			catch(Exception ex)
			{
				return BadRequest(ex.Message);
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
