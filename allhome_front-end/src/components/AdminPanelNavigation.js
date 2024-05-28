import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminPanelNavigation() {
    const navigate = useNavigate();

    function handleLogout() {
        const response = window.confirm('Are you sure to Logout?');

        if (response) {
            sessionStorage.removeItem('adminSession');
            navigate('/admin/login');
        }
    }

    return(
        <nav>
            <div>
                <ul>
                    <li>
                        <Link to={'/admin/panel'}>Home</Link>
                    </li>   
                    <li>
                        <Link to={'/admin/panel/manage_user'}>Manage User</Link>
                    </li>
                    <li>
                        <Link to={'/admin/panel/manage_product'}>Manage Product</Link>
                    </li> 
                    <button onClick={handleLogout}>Logout</button>
                </ul>
            </div>
        </nav>
    );
}

export default AdminPanelNavigation;