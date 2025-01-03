import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CartRetriever from '../cart';
import './App.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <div>Whoop, Nada</div>
    },
    {
      path:'/:tx',
      element: <CartRetriever />
    }
  ]
);

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;