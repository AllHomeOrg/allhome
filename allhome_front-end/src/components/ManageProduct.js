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
            <div className='container'>
            <h1 className='lbl'>Manage Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className = "col-sm-3">
                        <input
                        class="form-control"
                            type="text"
                            name="name"
                            value={productData.name}
                            onChange={handleInputChange}
                            placeholder="Product Name"
                            required
                        />
                    </div>
                    <div className = "col-sm-4">
                        <input
                        class="form-control"
                            type="text"
                            name="description"
                            value={productData.description}
                            onChange={handleInputChange}
                            placeholder="Product Description"
                            required
                        />
                    </div>
                    <div className = "col-sm-2">
                        <input
                            class="form-control"
                            type="number"
                            name="price"
                            value={productData.price}
                            onChange={handleInputChange}
                            placeholder="Product Price"
                            required
                         />
                    </div>
                    <div className = "col-sm-2">
                        <button class="form-control add-update"  type="submit">{editingProductId ? 'Update Product' : 'Add Product'}
                    </button>
                    </div>
                    
                    <div className = "col-sm-1">
                        {editingProductId && 
                        <button class="form-control btn btn-danger"  type="button" onClick={handleCancel}>Cancel</button>}
                    </div>
                </div>
            </form>
            <br />
            <table className='table'>
                <tbody>
                {products.map((product) => (
                    <tr key={product.product_id}>
                        <td>{product.product_name} </td>
                        <td>{product.product_description} </td>
                        <td>PHP {product.product_price.toFixed(2)}</td>
                        <td><button className='btn editbtn'onClick={() => handleEdit(product)}>Edit</button></td>
                        <td><button className='btn btn-danger' onClick={() => handleDelete(product.product_id)}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default ManageProduct;