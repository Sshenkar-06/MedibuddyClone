import { Box, Card, Divider, Typography } from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const BillBreakDown = () => {
    const {order} = useContext(CartContext);

    return (
       <>
          <Card sx={{p:2}}>
              <Typography variant="h6" gutterBottom>Bill Breakdown</Typography>
              <Divider sx={{mb:2}}></Divider>
              <Box display='flex' justifyContent='space-between' mb={1}>
                <Typography>Total MRP</Typography>
                <Typography>₹{order.totalMRP}</Typography>
              </Box>
              <Box display='flex' justifyContent='space-between' mb={1}>
                <Typography>Discount</Typography>
                <Typography color="green">-₹{order.totalDiscount}</Typography>
              </Box>
              <Divider sx={{my:2}}></Divider>
              <Box display='flex' justifyContent='space-between' mb={1}>
                <Typography variant="subtitle1" fontWeight='bold'>Estimated Total</Typography>
                <Typography variant="subtitle1" fontWeight='bold'>₹{order.totalPrice}</Typography>
              </Box>
          </Card>
       </>
    )

}

export default BillBreakDown;