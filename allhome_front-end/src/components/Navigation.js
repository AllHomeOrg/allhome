import { Link } from 'react-router-dom';

function Navigation() {
    return(
        <nav className="navbar fixed-top">
            <div className="container-fluid" >
                <ul className="nav nav-underline" >
                    <li className="nav-item" >
                        <Link to={'/'} className="nav-link">Home</Link>
                    </li>   
                    <li className="nav-item">
                        <Link to={'/my-cart'} className="nav-link">My Cart</Link>
                    </li> 
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;