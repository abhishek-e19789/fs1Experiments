import {React} from 'react';
import './ProductCard.css';

const ProductCard = ({productName, productPrice, stockStatus}) => {
    return(
        <>  
            <div className="product-card">
                <h2 className="product-name">{productName}</h2>
                <p className="product-price">${productPrice}</p>
                <p className={`stock-status ${stockStatus === "In Stock" ? "" : "out-stock"}`}>{stockStatus}</p>
            </div>
        </>
    );
}

export {ProductCard};