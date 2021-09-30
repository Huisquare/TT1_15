import React, { useState, useEffect } from "react";
import CartItems from './cartItems';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ShoppingCart() {

    const [exist, setExist] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        let products = [];
        if (localStorage.getItem("products")) {
            setExist(true);
            products = JSON.parse(localStorage.getItem("products"));
        }

        let compiledProducts = Array(21).fill(0);
        for (let index in products) {
            let productId = products[index].productId;
            compiledProducts[productId] = compiledProducts[productId] + 1;
        }
        let data = [];
        for (let i in compiledProducts) {
            if (compiledProducts[i] !== 0) {
                var obj = {
                    productId: i,
                    qty: compiledProducts[i]
                }
                data.push(obj);
            }
        }
        setList(data);
    }, [exist]);

    return (
        <div>
            {!exist ? <Typography>Shopping cart is empty</Typography>
            :<>
            <Typography variant="h3" style={{ 'textAlign': 'left', 'paddingLeft': '50px' }}>ShoppingCart</Typography>
            {list.map((dataItem, index) => (
                <CartItems key={index} productId={dataItem.productId} qty={dataItem.qty}/>    
            ))}
            

            <Button variant="contained">Checkout</Button>
            </>}
        </div>
    );
}