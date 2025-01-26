import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export interface Cart {
    id: string
    items: Item[]
}

interface Item {
    name: string
    price: number
    tax: number
    currency: string
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function getTotal(cart: Cart) {
    let t = 0;
    cart?.items.map(item => t += item.price + item.tax);
    return t;
}
function CartRetriever() {
    const [cart, setCart] = useState<Cart | null>();
    const { tx } = useParams();
    const transaction = useRef(tx as string);
    const [open, setOpen] = useState(true);
    const [total, setTotal] = useState(0);
    const [currency, setCurrency] = useState("usd");

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const getCart = async () => {
            const res = await fetchCartData(transaction.current);
            setCart(res);
        }
        if (!cart) {
            getCart();
        }
        else {
            setTotal(getTotal(cart));
        }
    }, [cart]);

    

    return (
        <div>
            <h2 id="tableLabel">Payment Summary</h2>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav" aria-labelledby="nested-list-subheader">
                    {cart?.items.map((item) => {
                        return <>
                            <ListItemButton onClick={handleClick}>
                            <ListItemText primary={item.name} />
                            {item.price + item.tax + " " + currency}
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem sx={{ pl: 3, pt: 0, pb: 0, pr: 7 }}>
                                        <ListItemText primary={"price:"} />
                                        {item.price + " " + item.currency}
                                    </ListItem>
                                    <ListItem sx={{ pl: 3, pt: 0, pb: 0, pr: 7 }}>
                                        <ListItemText primary={"tax:"} />
                                        {item.tax + " " + item.currency}
                                    </ListItem>
                                </List>
                            </Collapse>
                        </>
                    })}
                </List>
                <ListItem sx={{ pl: 2, pt: 0, pb: 0, pr: 5 }}>
                    <ListItemText primary={"Total:"} />
                    {total + " " + currency}
                </ListItem>                
            </ThemeProvider>
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