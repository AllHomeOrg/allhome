import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import ProductPages from './components/ProductPages';

function App() {
  const [products, setProducts] = useState([]);
  const [itemQty, setItemQty] = useState([]);
  const [showNavigation, setShowNavigation] = useState(true);

  // initialize new cart
  async function initNewCart() {
    const cartId = JSON.parse(localStorage.getItem('cartId'));
    let currCartId;

    if (!cartId || cartId === 0 ) {
      currCartId = 1;
      localStorage.setItem('cartId', JSON.stringify(currCartId));
    }

    const currDate = new Date();
    const formattedDate = currDate.toISOString().slice(0, 10);

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/cart/add`, 
                        {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({ cart_date: formattedDate })
                        });

        if (!response.ok) {
            throw new Error('Failed to add cart');
        }

        const data = await response.json();

        if (data.status === 201) {
            console.log(data.message);
        }
    } catch (error) {
        console.error(`Error: ${error}`);
    }
  }

  // store the id and quantity to the seperate
  // defaults the quantity to 1
  React.useEffect(() => {
    if (products.length !== 0) {
      products.forEach(item => {
        const itemInfo = {
          product_id: item.product_id,
          quantity: 1
        };

        setItemQty(prevItemQty => [...prevItemQty, itemInfo]);
      });
    }
  }, [products]);

  // this fetches the items from a cart
  React.useEffect(() => {
    async function fetchProductList() {
      try {
          const response = 
                    await fetch('http://127.0.0.1:8000/api/product_list', 
                    {
                      method: 'GET', 
                      headers: {'Content-Type': 'application/json'}
                    });

          if (!response.ok) {
            throw new Error('Failed to retrieve products');
          }

          const data = await response.json();

          if (data.status === 200) {
            setProducts(data.data);
          }
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    }

    fetchProductList();
  }, [setProducts]);

  // adds item to cart
  function addToCart(productId) {
    const cartId = JSON.parse(localStorage.getItem('cartId'));
    const retrievedProductQty = itemQty.find(product => product.product_id === productId);

    if (retrievedProductQty) {
      addItemToCart(cartId, productId, retrievedProductQty.quantity);
    }
  }

  // adds item to cart cont.
  async function addItemToCart(cartId, productId, quantity) {
    await fetch(`http://127.0.0.1:8000/api/cart/${cartId}/product/${productId}/add`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        quantity: quantity
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error adding item to cart');
      }

      return response.json();
    })
    .then(data => {
      if (data.status === 201) {
        console.log(data.message);
      }
    })
    .catch(error => console.error('Error:', error));
  }

  return (
    <BrowserRouter>
      <div>
        {showNavigation && <Navigation />}
        <Routes>
          <Route exact path='/' element={<Home initNewCart={initNewCart} />} />
          <Route path='/my-cart'/>
          <Route path='/product-pages'
                element={<ProductPages products={products}
                setCarts={addToCart}
                setShowNavigation={setShowNavigation} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
