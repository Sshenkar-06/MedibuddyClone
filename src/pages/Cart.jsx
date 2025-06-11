import { Box, Button, Card, CardContent, CardMedia, Container, Divider, Grid, IconButton, Modal, Paper, styled, Typography } from "@mui/material";
import React, { useContext, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import AddressModal from "../components/AddressModal";
import BillBreakDown from "../components/billBreakdown";
import { Add } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const Cart = () => {
  const { cartItems, handleQuantity, deleteCartItem,order,selectedAddress } = useContext(CartContext);
 
  console.log("order", order);

  const handleConfirm = (drugCode) => {
    const isConfirm = confirm("Are You Sure");
    if (isConfirm) {
      deleteCartItem(drugCode);
    }
  }


  const [open,setOpen] = useState(false);

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);


  return (
    <Box sx={{ flexGrow: 1, width: '90%', margin: 'auto', mt: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 8 }}>
          {
            order.cartItems.map((medicine) => (
              <Card key={medicine.drugCode} sx={{ mb: 2, display: 'flex' }} >
                <CardMedia
                  component='img'
                  sx={{ width: 100, padding: 2, objectFit: 'cover' }}
                  image={medicine.productImageSlug[0]}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent>
                    <Typography variant="h6">{medicine.name}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>{medicine.type}</Typography>
                    <Typography variant="subtitle2" sx={{ mt: 2 }}>₹{medicine.discountPrice} <span style={{ textDecoration: 'line-through', color: '#aaa', marginLeft: 2 }}>₹{medicine.actualPrice}</span></Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
                    <Button startIcon={<DeleteIcon />} onClick={() => handleConfirm(medicine.drugCode)}>
                      Delete
                    </Button>

                    <IconButton onClick={() => handleQuantity(medicine.drugCode, 'Increase')} sx={{ marginLeft: 4 }}><AddCircleOutlineIcon /></IconButton>
                    <Typography> {medicine.quantity}</Typography>
                    <IconButton onClick={() => handleQuantity(medicine.drugCode, 'Decrease')}><RemoveCircleOutlineIcon /></IconButton>

                  </Box>
                </Box>
                <Divider />
              </Card>


            ))
          }
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>

          <Card sx={{ p: 1 , mb:2 }}>
            {/* <Box display='flex' justifyContent='space-between' mb={1}>
              <Typography></Typography>
              <Typography>3000</Typography>
            </Box> */}
            {
              selectedAddress ? <Box mb={1} sx={{ mt: 1, p:2 }}>
                <Box display='flex' justifyContent='space-between'>
                  <Typography variant="subtitle1" fontWeight='bold'>Deliver To Home</Typography>
                  <Button onClick={handleModalOpen} sx={{fontWeight:'bolder'}}>Change</Button>
                </Box>
                <Typography>{selectedAddress.address}</Typography>
              </Box>
                : <Box display='flex' justifyContent='space-between' mb={1} p={2}>
                  <Button fullWidth variant="outlined" onClick={handleModalOpen} startIcon={<Add />}>
                    Select Address
                  </Button>
                </Box>
            }
           

          

          </Card>





          <Modal open={open} onClose={handleModalClose}>
            <Box sx={{ width: 600, p: 3, bgcolor: 'background.paper', mx: 'auto', mt: 2, borderRadius: 2 }}>
              <AddressModal close={handleModalClose}></AddressModal>
            </Box>
          </Modal>

          {/* Bill Breakdown */}
          <BillBreakDown></BillBreakDown>

          <Button
            fullWidth
            variant="contained"
            sx={{mt:2}}
          >
           <NavLink to='/patient-details'> Checkout</NavLink>
          </Button>
        </Grid>

      </Grid>
    </Box>


    // </>
  )
}

export default Cart;