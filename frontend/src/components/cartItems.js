import React, { useState, useEffect, useRef } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import { Nav } from "react-bootstrap";


export default function CartItems(props) {

    const [editButton, setEditButton] = useState(false);
    const [deleteButton, setDeleteButton] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
		const [errorMsg, setErrorMsg] = useState("");
		const input = useRef("");
		const [inputQty, setInputQty] = useState(0);
		const [qty, setQty] = useState(0);

    const handleDelete = () => {
			let products = [];
			if (localStorage.getItem("products")) {
					products = JSON.parse(localStorage.getItem("products"));
			}
			products = products.filter(function(obj) {
				return Number(obj.productId) !== Number(props.productId);
			});
			localStorage.setItem("products", JSON.stringify(products));
      setDeleteButton(false);
    }

    const handleOpenDelete = () => {
        setDeleteButton(true);
    }

    const handleCloseDelete = () => {
        setDeleteButton(false);
    }

    const handleEdit = () => {
			let products = [];
			if (localStorage.getItem("products")) {
					products = JSON.parse(localStorage.getItem("products"));
			}
			products = products.filter(function(obj) {
				return Number(obj.productId) !== Number(props.productId);
			});
			const currentValue = input.current.value;
			for (let i = 0; i < currentValue; i++) {
				products.push({ productId: Number(props.productId) });
			}
			localStorage.setItem("products", JSON.stringify(products));
			setQty(currentValue);
			setEditButton(false);
	}

    const handleOpenEdit = () => {
        setEditButton(true);
    }

    const handleCloseEdit = () => {
        setEditButton(false);
    }

		useEffect(() => {
			setQty(props.qty);
		}, [inputQty]);

    const price = props.price;
    const productId = props.productId;
		const name = props.name;

    return (
        <Container style={{ 'display': 'flex', 'flexDirection': 'row', 'padding': '25px 0px 25px 0px' }}>
            <Container style={{ 'display': 'flex', 'flexDirection': 'column' }}>
                <Typography variant="h6" style={{ 'textAlign': 'left' }}>{name}</Typography>
                <Typography variant="h6" style={{ 'textAlign': 'left' }}>${price}</Typography>
            </Container>
            <Container style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'flex-end' }}>
                <Typography variant="h6" style={{ 'textAlign': 'right', 'paddingRight': '10px' }}>{qty}</Typography>
                <Button
                    onClick={() => handleOpenEdit()}
                    variant="contained"
                    style={{ maxWidth: '60px', maxHeight: '35px', minWidth: '60px', minHeight: '35px' }}
                >Edit</Button>
                <Dialog open={editButton} onClose={() => handleCloseEdit()}
                    BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
                    PaperProps={{ style: { boxShadow: "none", overflow: "hidden" } }}
                >
                    <DialogTitle id="form-dialog-title">Edit item</DialogTitle>
										<br/>
                    <DialogContent>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                autoFocus
                                id="outlined-number"
                                label="Quantity"
																type="number"
                                inputRef={input}
																defaultValue={qty}
                            />
                            <Typography color="secondary" variant="subtitle2"><br />{errorMsg}</Typography>
                            {submitLoading ?
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgress color="secondary" />
                                </Box> : <></>}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEdit} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleEdit} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button
                    onClick={() => handleOpenDelete()}
                    variant="contained"
                    style={{ maxWidth: '70px', maxHeight: '35px', minWidth: '70px', minHeight: '35px' }}
                >Delete</Button>
                <Dialog open={deleteButton} onClose={() => handleCloseDelete()}
                    BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
                    PaperProps={{ style: { boxShadow: "none", overflow: "hidden" } }}
                >
                    <DialogTitle id="form-dialog-title">Delete item</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Confirm delete?
                        </DialogContentText>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {submitLoading ?
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgress color="secondary" />
                                </Box> : <></>}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDelete} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} color="primary">
													<Nav.Link href="/cart">Ok</Nav.Link>
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Container>
    );
}