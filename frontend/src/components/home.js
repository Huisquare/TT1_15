import React from "react";
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
  return (
    <div>
      <h1>All Products</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
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
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
