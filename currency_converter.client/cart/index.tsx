import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export interface Cart {
    id: string
    items: Item[]
}

interface Item {
    name: string
    price: number
    currency: string
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function CartRetriever() {
    const [cart, setCart] = useState<Cart | null>();
    const { tx } = useParams();
    const transaction = useRef(tx as string);
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

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
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Nested List Items
                    </ListSubheader>
                }
            >
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                    </List>
                </Collapse>
                </List>
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