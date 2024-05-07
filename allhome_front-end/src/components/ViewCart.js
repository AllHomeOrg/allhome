import { useEffect } from 'react';
import { Link } from 'react-router-dom';
function ViewCart({ cartItems, setCartItems, products, onRemoveFromCart, setShowNavigation }) {
  useEffect(() => {
    async function getCartList() {
      const cartId = JSON.parse(localStorage.getItem('cartId'));
  
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/cart/${cartId}/view`, 
                          {
                            method: 'GET',
                            headers: {'Content-Type': 'application/json'}
                          });
        
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }                  
  
        const data = await response.json();       
  
        if (data.status === 200) {
          setCartItems(data.carts.items);
        }           
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    }

    getCartList();
  }, [setCartItems, onRemoveFromCart]);

  function displayProductList() {
    if (products.length === 0) {
      return <div className='container empty-cart'><p className='emptylbl'>Loading cart items...</p> </div>; 
    } else if (cartItems.length === 0) {
      return <p className="emptylbl">Your Cart is Empty!</p>;
    } else {
      return (
        <div>
          <table className='table'>
              <tbody>
                {cartItems.map(item => {
                  // Find the corresponding product in products array
                  const product = products.find(p => p.product_id === item.product_id);
                  
                  if (!product) {
                    console.error(`Product not found for cart item ID: ${item.cart_item_id}`);
                    return null; // Skip rendering if product not found
                  }
                  
                  return (

                    <tr key={item.cart_item_id}>
                      <td className='prodName'>{product.product_name} </td>
                      <td> Quantity: {item.quantity} </td>
                      <td> Price: {product.product_price}</td>
                      <td className='totalPrice'> Total price: Php {item.total_price.toFixed(2)} </td>
                      <td><button className="btn btn-danger" onClick={() => onRemoveFromCart(item.cart_item_id)}>Remove</button></td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <div className="container btncon-additem">
              <Link to={'/product-pages'}>
                <button className="btn btn-light addItem"> + Add more item</button>
              </Link>
          </div>

          <div style={{ height: '150px' }}></div>
            <div className="checkOutcon">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                  <p className = "cartlabel">No. of Item/s: {cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
                  <p className='cartlabel'>Total Price: Php {cartItems.reduce((total, product) => total + product.total_price, 0).toFixed(2)}</p>
                  <Link to={'/shipping_details'} > <button className="btn btn-light">Proceed to Checkout</button> </Link>
              </li>
            </div>

            
        </div>
      );
    }
  }

  return (
    <div className="container" onLoad={() => setShowNavigation(true)}>
      <h1 className="cartlbl">My Cart</h1>
      <h4 className="prodlistlbl">Product List</h4>
      <div>
         {displayProductList()}
      </div>
    </div>
  );
}


export default ViewCart;