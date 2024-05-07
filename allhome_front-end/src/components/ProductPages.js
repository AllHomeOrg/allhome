import React from 'react';
import ProductInformation from './ProductInformation';


function ProductPages({ products, setCarts, setShowNavigation }) {
    const handleAddToCart = (productId) => {
        setCarts(productId);
    };

    function displayProductList() {
      if (products.length === 0) {
        return <div className="container empty"><p className='emptylbl'>Loading products...</p></div>;
      } else {
        return (
          <>
            <h1 className='prodPageLbl'> Product Page</h1>
            <div className="row gy-3" style={{marginTop: '40px'}}>
              {products.map(product => (
                <ProductInformation
                  key={product.product_id}
                  id={product.product_id}
                  name={product.product_name}
                  price={product.product_price}
                  description={product.product_description}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            <div style={{ height: '150px' }}></div>
          </>
        );
      }
    }

    return (
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap' }} 
            onLoad={() => setShowNavigation(true)}
        >
          {displayProductList()}
        </div>
      );
}

export default ProductPages;