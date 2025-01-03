import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

interface Cart {
    id: string;
    items: Item[];
}

interface Item {
    name: string;
    price: number;
    currency: string;
}

function CartRetriever() {
    const [cart, setCart] = useState<Cart>();
    const { tx } = useParams();
    const transaction = useRef(tx as string);
    console.log(transaction.current);


    useEffect(() => {
        fetchCartData(transaction.current);
    }, []);

    const contents = <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
            <tr>
                <th>Date</th>
                <th>Temp. (C)</th>
                <th>Temp. (F)</th>
                <th>Summary</th>
            </tr>
        </thead>
        <tbody>
            {cart?.items.map(cart =>
                <tr key={cart.name}>
                    <td>{cart.price}</td>
                    <td>{cart.currency}</td>
                </tr>
            )}
        </tbody>
    </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function fetchCartData(id: string) {
        const response = await fetch(`cart/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        const data = await response.json();
        setCart(data);
        console.log(cart);
    }
}

export default CartRetriever;