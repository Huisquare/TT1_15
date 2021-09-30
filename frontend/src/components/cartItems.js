import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';


export default function CartItems(props) {
    // const title = props.title;
    // const price = props.price;
    const title = "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops";
    const price = "109.95";
    var quantity = 1;
    return (
        <Container style={{ 'display': 'flex', 'flexDirection': 'row', 'padding': '25px 0px 25px 0px' }}>
            <Container style={{ 'display': 'flex', 'flexDirection': 'column' }}>
                <Typography variant="h6" style={{ 'textAlign': 'left' }}>{title}</Typography>
                <Typography variant="h6" style={{ 'textAlign': 'left' }}>${price}</Typography>
            </Container>
            <Container style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'flex-end' }}>
                <Typography variant="h6" style={{ 'textAlign': 'right', 'paddingRight': '10px' }}>{quantity}</Typography>
                <Button variant="contained" style={{maxWidth: '60px', maxHeight: '35px', minWidth: '60px', minHeight: '35px'}}>Edit</Button>
            </Container>
        </Container>
    );
}