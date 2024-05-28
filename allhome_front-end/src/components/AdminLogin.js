import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();

    function handleInputChange(e) {
        const { name, value } = e.target;

        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const user = await getUserFromDatabase(username);

        if (user && password === user.password) {
            alert('Successfully Logged In');
            sessionStorage.setItem('adminSession', JSON.stringify(user));
            navigate('/admin/panel');
        }
    }

    // retrieve user
    async function getUserFromDatabase(username) {
        let user = null;

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/user/${username}`);

            if (!response.ok) {
                throw new Error('Failed to get specified user.');
            }

            const data = await response.json();

            if (data.status === 200) {
                user = data.user;
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }

        return user;
    }

    function isAlreadyInSession() {
        const adminSession = JSON.parse(sessionStorage.getItem('adminSession'));
        return adminSession ? true : false;
    }

    return (
        <div>
            {isAlreadyInSession() ? navigate('/admin/panel') : (
                <>
                    <h2>Admin Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input 
                                type="text" 
                                id="username" 
                                name="username" 
                                onChange={handleInputChange}
                                required />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                onChange={handleInputChange}
                                required />
                        </div>
                        <div>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}

export default AdminLogin;