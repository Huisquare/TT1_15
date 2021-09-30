import React, { useState } from "react";
import styled from "styled-components";
import products from "../products.json";
import { Col, Card, Row, Button } from "react-bootstrap";
import './home.css';

const Home = () => {
  const addToCart = (id) => {
    let products = [];
    if (localStorage.getItem("products")) {
      products = JSON.parse(localStorage.getItem("products"));
    }
    products.push({ productId: id });
    localStorage.setItem("products", JSON.stringify(products));
  };
  return (
      <div>
          <h1>All Products</h1>
          <Row xs={1} md={3} className="g-4">
              {products.map((product) => {
                  return (
                      <Col>
                          <cardStyle>
                              <Card key={product.id} className="card">
                                  <Card.Img
                                      variant="top"
                                      src={product.image}
                                      className="img"
                                  />
                                  <Card.Body>
                                      <Card.Title>{product.title}</Card.Title>
                                      <div>
                                          <br></br>
                                      </div>
                                      <Card.Text>
                                          {product.description}
                                      </Card.Text>
                                      <div>
                                          <br></br>
                                      </div>
                                      <Button
                                          variant="primary btn-lg"
                                          onClick={() =>
                                              addToCart(product.imageid)
                                          }
                                          className="btn"
                                      >
                                          Add to Cart
                                      </Button>
                                  </Card.Body>
                              </Card>
                          </cardStyle>
                      </Col>
                  );
              })}
          </Row>
      </div>
  );
};

const cardStyle = styled.div`
  .card-img-top {
    width: 100%;
    height: 5vw;
    object-fit: cover;
  }
`;

export default Home;
