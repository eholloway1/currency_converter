namespace Currency_Converter.Server.Models;

public record Cart(
    string id,
    Item[] items
 );

public record Item(
    string name,
    float price,
    string currency
);
