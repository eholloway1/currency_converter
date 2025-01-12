import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

export interface Cart {
    id: string
    items: Item[]
}

interface Item {
    name: string
    price: number
    currency: string
}

function CartRetriever() {
    const [cart, setCart] = useState<Cart | null>();
    const { tx } = useParams();
    const transaction = useRef(tx as string);
    console.log(transaction.current);


    useEffect(() => {
        const getCart = async () => {
            const res = await fetchCartData(transaction.current);
            setCart(res);

            console.log(cart?.id);
        }
        getCart();
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
                    <td>{cart.name}</td>
                    <td>{cart.price}</td>
                    <td>{cart.currency}</td>
                </tr>)}
        </tbody>
    </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function fetchCartData(id: string): Promise<Cart> {
        const response = await fetch(`Cart/${id}`, {
            method: 'GET'
        });
        const data = response.json();

        console.log(data);

        return data;
    }
}

export default CartRetriever;