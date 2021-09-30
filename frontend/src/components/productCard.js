import React from "react";

const productCard = ({ product }) => {
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
};

export default productCard;
