import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanelNavigation from './AdminPanelNavigation';

function ManageProduct({ products, fetchProductList }) {
    const [productData, setProductData] = useState({ name: '', description: '', price: '' });
    const [editingProductId, setEditingProductId] = useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        // check if is in session
        const adminSession = JSON.parse(sessionStorage.getItem('adminSession'));

        if (!adminSession) {
            navigate('/admin/login');
        }
    }, [navigate]);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const url = editingProductId ? `http://127.0.0.1:8000/api/product/${editingProductId}/edit` : `http://127.0.0.1:8000/api/product/add`;
            const method = editingProductId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_name: productData.name,
                    product_description: productData.description,
                    product_price: productData.price
                }),
            });

            if (!response.ok) {
                throw new Error('Error occured!');
            }

            const data = await response.json();

            if (data.status === 201 || data.status === 200) {
                console.log(data.message);

                // clear user input
                setProductData({ name: '', description: '', price: '' });
                setEditingProductId(null);
                // update list
                fetchProductList();
            } else if (data.errors) {
                // Construct error message from validation errors
                let errorMessage = 'Validation errors:';
                for (const field in data.errors) {
                    errorMessage += `\n${field}: ${data.errors[field][0]}`;
                }
                alert(errorMessage);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    function handleEdit(product) {
        setProductData({
            name: product.product_name,
            description: product.product_description,
            price: product.product_price
        });
        setEditingProductId(product.product_id);
    };

    async function handleDelete(productId) {
        const response = window.confirm('Are you sure to remove the product?');

        if (response) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/product/${productId}/remove`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to remove product');
                }

                const data = await response.json();

                if (data.status === 200) {
                    console.log(data.message);

                    fetchProductList();
                }
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        }
    };

    function handleCancel() {
        setProductData({ name: '', description: '', price: '' });
        setEditingProductId(null);
    };

    return (
        <div>
            <AdminPanelNavigation />
            <h1>Manage Product</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    placeholder="Product Description"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    placeholder="Product Price"
                    required
                />
                <button type="submit">{editingProductId ? 'Update Product' : 'Add Product'}</button>
                {editingProductId && <button type="button" onClick={handleCancel}>Cancel</button>}
            </form>
            <br />
            <ul>
                {products.map((product) => (
                    <li key={product.product_id}>
                        {product.product_name} - {product.product_description} - {product.product_price.toFixed(2)}PHP
                        <button onClick={() => handleEdit(product)}>Edit</button>
                        <button onClick={() => handleDelete(product.product_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageProduct;