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

const acceptedCurrencies = [
    "usd",
    "gpb",
    "yen",
    "cad"
];

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
    const [open, setOpen] = useState<(boolean | undefined)[]>([]);
    const [currencyDropOpen, setDropOpen] = useState(false);
    const [total, setTotal] = useState(0);
    const [currency, setCurrency] = useState("usd");
    
    const handleClick = (index: number) => {
        const list = open.map((o, i) => {
            if (index === i) {
               return !o;
            }
            else {
                return o;
            }
        });

        setOpen(list);
    };

    const currencyDropdownClick = () => {
        setDropOpen(!currencyDropOpen);
    };

    const currencySelect = (cur: string) => {
        setCurrency(cur);
    }

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
            cart.items.forEach(() => setOpen([...open, false]));
        }
    }, [cart]);



    return (
        <div>
            <h2 id="tableLabel">Payment Summary</h2>
            
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <List sx={{ pl: 14, pt: 0, pr: 2, pb: 0, width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav" aria-labelledby="nested-list-subheader">
                    <ListItemButton onClick={currencyDropdownClick} sx={{ pl: 0, pt: 0, pr: 0, pb: 0 }}>
                        <ListItemText primary="currency" />
                        {currencyDropOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={currencyDropOpen} timeout="auto" unmountOnExit>
                    {acceptedCurrencies.map((c) => {
                        return <>
                                <List component="div" disablePadding>
                                    <ListItemButton onClick={() => currencySelect(c)} >
                                    <ListItemText primary={c} />
                                    </ListItemButton>
                                </List>
                            
                        </> }) }
                    </Collapse>
                </List>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav" aria-labelledby="nested-list-subheader">
                    {cart?.items.map((item, index) => {
                        return <>
                            <ListItemButton onClick={() => handleClick(index)}>
                                <ListItemText primary={item.name} />
                                {item.price + item.tax + " " + currency}
                                {open[index] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem sx={{ pl: 3, pt: 0, pb: 0, pr: 7 }}>
                                        <ListItemText primary={"price:"} />
                                        {item.price + " " + currency}
                                    </ListItem>
                                    <ListItem sx={{ pl: 3, pt: 0, pb: 0, pr: 7 }}>
                                        <ListItemText primary={"tax:"} />
                                        {item.tax + " " + currency}
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