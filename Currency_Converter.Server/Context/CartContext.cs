using Microsoft.EntityFrameworkCore;

namespace Currency_Converter.Server.Context;

public class CartContext : DbContext
{
	public CartContext(DbContextOptions<CartContext> options) : base(options)
	{

	}

	public DbSet<CartContext> Carts { get; set; }
}
