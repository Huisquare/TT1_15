import React, { useState } from "react";
import products from "../products.json";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

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
    <>
      <h1>All Products</h1>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        {products.map((product) => {
          return (
            <Grid item xs={6} key={product.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader title={product.title} />
                <CardMedia
                  component="img"
                  alt={product.title}
                  height="140"
                  image={product.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="body2" component="div">
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => addToCart(product.id)}>
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Home;
