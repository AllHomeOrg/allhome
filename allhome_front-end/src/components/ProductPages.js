import React from 'react';
import ProductInformation from './ProductInformation';
import Navigation from './Navigation';


function ProductPages({ products, setCarts }) {
  const handleAddToCart = (productId) => {
    setCarts(productId);
  };

  function displayProductList() {
    if (products.length === 0) {
      return (
        <div className="container empty">
          <p className='emptylbl'>Loading products...</p>
        </div>
      );
    } else {
      return (
        <>
          <h1 className='prodPageLbl'> Product Page</h1>
          <div className="row gy-3" style={{ marginTop: '40px' }}>
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
    <>
      <Navigation />
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {displayProductList()}
      </div>
    </>
  );
}

export default ProductPages;