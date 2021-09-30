import React from "react";
import products from "../products.json";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

const Home = () => {
  return (
    <div>
      <h1>All Products</h1>
      {products.map((product) => {
        return (
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader title={product.title} />
            <CardMedia
              component="img"
              alt={product.title}
              height="140"
              image={product.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Add To Cart</Button>
            </CardActions>
          </Card>
          /*  <div key={product.id}>
            <h3>{product.title}</h3>
            <img src={product.image} />
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>
              <button>Add to Cart</button>
            </p>
          </div> */
        );
      })}
    </div>
  );
};

export default Home;
