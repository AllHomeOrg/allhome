import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ShippingDetails({ setShowNavigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    function handleOnClick() {
        setShowNavigation(true);
    }

    async function askConfirmation() {
        let response = window.confirm('Are you sure to check-out?');

        if (response) {
            const cartId = JSON.parse(localStorage.getItem('cartId'));

            try {
                const url = `http://127.0.0.1:8000/api/shipping_detail/${cartId}/add`;

                const response = await fetch(url, 
                                {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
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
            // returns to home page
            window.location.href = '/';
        }
    }, [isSuccess, setShowNavigation]);

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
        <div className='container shipping-details-container' onLoad={() => setShowNavigation(true)}>
           <div>
           <Link to={'/my-cart'} >
                 <div className ="d-grid gap-2 d-md-block">
                     <button class= "btn back"onClick={handleOnClick}> &larr; Go Back</button>
                 </div>
            </Link>
                <div class="h1con">
                    <h1 class="h1">Enter Your Shipping Details</h1>
                </div>
                

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">First Name </label>
                        <input className="form-control" 
                               id="exampleFormControlInput1"
                               type='text'
                               placeholder='Enter your first name'
                               onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Last Name </label>
                        <input
                            class="form-control" 
                            id="exampleFormControlInput1"
                            type='text'
                            placeholder='Enter your last name'
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label"> Address </label>
                        <input
                            class="form-control" 
                            id="exampleFormControlInput1"
                            type='text'
                            placeholder='Enter your address'
                            onChange={(e) => setAddress(e.target.value) }
                         />
                    </div>

                    <div class="d-grid gap-2">
                        <button class='btn checkout-button' type='submit'>Checkout</button>
                    </div>
                    
                </form>
             </div>

           
        </div>
    );
}

export default ShippingDetails;