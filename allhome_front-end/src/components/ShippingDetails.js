import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ShippingDetails() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    async function askConfirmation() {
        let response = window.confirm('Are you sure to check-out?');

        if (response) {
            const cartId = JSON.parse(localStorage.getItem('cartId'));

            try {
                const url = `http://127.0.0.1:8000/api/shipping_detail/${cartId}/add`;

                const response = await fetch(url,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            first_name: firstName,
                            last_name: lastName,
                            address: address
                        })
                    });

                if (!response.ok) {
                    throw new Error('Failed to send shipping details');
                }

                const data = await response.json();

                if (data.status === 201) {
                    console.info(data.message);
                    setIsSuccess(true);
                }
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        }
    }

    React.useEffect(() => {
        if (isSuccess) {
            const cartId = JSON.parse(localStorage.getItem('cartId'));
            // increment cart_id
            let currCartId = cartId + 1;
            // store to local storage
            localStorage.setItem('cartId', JSON.stringify(currCartId));

            // clear the fields
            setFirstName('');
            setLastName('');
            setAddress('');

            alert('Successfully Checked Out!!\n\nHappy Shopping!');
            // removes session cartId
            sessionStorage.removeItem('cartId');
            // returns to home page
            navigate('/');
        }
    }, [isSuccess, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();

        // using guard clause to validate input
        if (!firstName.trim()) {
            alert('Please enter first name.');
            return;
        }

        if (!lastName.trim()) {
            alert('Please enter last name.');
            return;
        }

        if (!address.trim()) {
            alert('Please enter address');
            return;
        }

        askConfirmation();
    }

    return (
        <div>
            <div className='container shipping-details-container'>
                <div>
                    <Link to={'/my-cart'} >
                        <div className="d-grid gap-2 d-md-block">
                            <button className="btn back"> &larr; Go Back</button>
                        </div>
                    </Link>
                    <div className="h1con">
                        <h1 className="h1">Enter Your Shipping Details</h1>
                    </div>


                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">First Name </label>
                            <input className="form-control"
                                id="exampleFormControlInput1"
                                type='text'
                                placeholder='Enter your first name'
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Last Name </label>
                            <input
                                className="form-control"
                                id="exampleFormControlInput1"
                                type='text'
                                placeholder='Enter your last name'
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label"> Address </label>
                            <input
                                className="form-control"
                                id="exampleFormControlInput1"
                                type='text'
                                placeholder='Enter your address'
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <button className='btn checkout-button' type='submit'>Checkout</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ShippingDetails;