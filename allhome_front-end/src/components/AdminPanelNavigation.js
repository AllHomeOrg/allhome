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
        <nav className="navbar fixed-top">
            <div className="container-fluid" >
                <ul className="nav nav-underline"> 
                    <li className="nav-item">
                        <Link to={'/admin/panel'} className="nav-link">Home</Link>
                    </li>   
                    <li className="nav-item">
                        <Link to={'/admin/panel/manage_user'} className="nav-link">Manage User</Link>
                    </li >
                    <li className="nav-item">
                        <Link to={'/admin/panel/manage_product'} className="nav-link">Manage Product</Link>
                    </li> 
                    <button onClick={handleLogout} className='btn btn-primary right-align' id ="logout">Logout</button>
                </ul>
            </div>
        </nav>
    );
}

export default AdminPanelNavigation;