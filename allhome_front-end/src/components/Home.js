import allhomelogo from '../assets/allhomelogo.png';
import { Link } from 'react-router-dom';
function Home({ initNewCart }) {
    return(
        <div className='container'>
            <div className="row justify-content-center mt-5">
                <div className="col-auto">
                    <img src={allhomelogo} className="img-fluid" alt='Company Logo' style={{ width: '801px', height: '214px', marginTop: '250px'}}/>
                </div>
            </div>
            
            
            <div className="row justify-content-center mt-5">
                <div className="col-auto">
                    <Link to={'/product-pages'} >
                        <button className="btn btn-outline-primary btn-lg shop" 
                                type="button" 
                                onClick={() => initNewCart()}
                        >
                            Proceed to Shopping
                        </button>
                    </Link>
                </div>
            </div>
        </div>
        
    );
}

export default Home;