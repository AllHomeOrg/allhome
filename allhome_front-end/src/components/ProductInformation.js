function ProductInformation(props) {
    return (
        <div className="col-md-3">
            <div className="card" style={{width: '18rem', height: '15rem'}}>
                <div className="card-body">
                    <h5 className="card-title fs-5">{props.name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Price: Php {props.price.toFixed(2)}</h6>
                    <p className="card-text fst-italic">Description: {props.description}</p>
                    <button className="btn add-to-cart" 
                        onClick={() => props.onAddToCart(props.id)}
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductInformation;