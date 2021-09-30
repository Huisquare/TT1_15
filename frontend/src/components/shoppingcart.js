import React, { useState, useEffect } from "react";
import CartItems from './cartItems';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import data from "../products.json";
import { Nav } from "react-bootstrap";

export default function ShoppingCart() {

    const [exist, setExist] = useState(false);
    const [list, setList] = useState([]);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [checkout, setCheckout] = useState(false);

    const handleCheckout = () => {
        localStorage.removeItem("products");
        setCheckout(true);
    }

    const handleOpen = () => {
        setCheckout(true);
    }

    const handleClose = () => {
        setCheckout(false);
    }

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
                : <>
                    <Typography variant="h3" style={{ 'textAlign': 'left', 'paddingLeft': '50px' }}>ShoppingCart</Typography>
                    {list.map((dataItem, index) => (
                        <CartItems
                            key={index}
                            productId={dataItem.productId}
                            name={data[dataItem.productId].title}
                            price={data[dataItem.productId].price}
                            qty={dataItem.qty}
                        />
                    ))}
                    <Button onClick={() => handleOpen()} variant="contained">Checkout</Button>
                    <Dialog open={checkout} onClose={() => handleClose()}
                        BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
                        PaperProps={{ style: { boxShadow: "none", overflow: "hidden" } }}
                    >
                        <DialogTitle id="form-dialog-title">Checkout</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Confirm checkout?
                            </DialogContentText>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {submitLoading ?
                                    <Box sx={{ width: '100%' }}>
                                        <LinearProgress color="secondary" />
                                    </Box> : <></>}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleCheckout} color="primary">
                                <Nav.Link href="/cart">Ok</Nav.Link>
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>}
        </div>
    );
}