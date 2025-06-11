import React, { useContext } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CartContext } from "../context/CartContext";

const MedicineCard = ({ medicine }) => {
    const {addToCart} = useContext(CartContext);
    return (
        <>
            <Card sx={{ maxWidth: 250 }}>
                <CardMedia
                    sx={{ height: 150, width:220 }}
                    image={medicine.productImageSlug[0]}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>
                        {medicine.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {medicine.medicineName}
                    </Typography>
                </CardContent>
                <CardActions sx={{padding:3,display:'flex',justifyContent:'space-between'}}>
                    <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>₹{medicine.actualPrice}</Typography>
                    <Button size="medium" sx={{border:2}} onClick={() => addToCart(medicine)}>Add</Button>
                </CardActions>
            </Card>

        </>

    )
}

export default MedicineCard;