import React from "react";
import CartItems from './cartItems';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ShoppingCart() {
    return (
        <div>
            <Typography variant="h3" style={{ 'textAlign': 'left', 'paddingLeft': '50px' }}>ShoppingCart</Typography>
            <CartItems title={"title"} price={"$100"}/>

            <Button variant="contained">Checkout</Button>
        </div>
    );
}