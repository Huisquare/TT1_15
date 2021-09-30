import React from "react";
import products from "../products.json";

const Home = () => {
  return (
    <div>
      <h1>All Products</h1>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>
              <button>Add to Cart</button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
