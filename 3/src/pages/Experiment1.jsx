import React from 'react';
import {ProductCard} from '../components/ProductCard.jsx';

const Product = [{productName: "Product1", productPrice: 19.99, stockStatus: "In Stock"},
{productName: "Product2", productPrice: 29.99, stockStatus: "Out of Stock"}
]

function Experiment1() {
  return (
    <>
    <h1>Product Card Using Props</h1>
    <div className="card">
      {Product.map((item, index) => (
        <ProductCard 
          key={index}
          productName={item.productName}
          productPrice={item.productPrice}
          stockStatus={item.stockStatus}
        />
      ))}
    </div>
    </>
  )
}

export default Experiment1;