import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid, IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { NavLink } from "react-router-dom";


const CategoryCard = ({ categories = [] }) => {
    const cardsPerSlide = 6;
    const [slideIndex, setSlideIndex] = useState(0);
    const totalSlides = Math.ceil(categories.length / cardsPerSlide);

    function handlePrev() {
        setSlideIndex(slideIndex - 1);
    }

    function handleNext() {
        if (slideIndex < (totalSlides - 1)) {
            setSlideIndex(slideIndex + 1);
        }
    }

    const startIndex = slideIndex * cardsPerSlide;
    const visibleCategories = categories.slice(startIndex, startIndex + cardsPerSlide);
    return (
        <>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <IconButton onClick={handlePrev} disabled={slideIndex == 0}>
                    <ArrowBackIosNew></ArrowBackIosNew>
                </IconButton>
                <Box width='100%' maxWidth='1200px'>
                    <Grid container spacing={2} wrap="nowrap">
                        {visibleCategories.map((card) => (
                            <Grid item xs={12} sm={4} md={2} key={card.id}>
                                <Card elevation={4}>
                                    <CardContent>
                                        <Typography  gutterBottom variant="h6" component="div" sx={{ fontSize: '16px', fontWeight: 'bolder', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                           <NavLink to={`/order-medicine/category/${card.categoryName.replace(/\s+/g,'-')}-${card.categoryId}`}  > {card.categoryName} </NavLink>
                                        </Typography>
                                        <CardMedia
                                            sx={{ height: 140, width: 160 }}
                                            image={card.categoryImageSlug[0]}
                                            title="green iguana"
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <IconButton onClick={handleNext} disabled={slideIndex == (totalSlides - 1)}>
                    <ArrowForwardIos></ArrowForwardIos>
                </IconButton>
            </Box>



            {/* {categories.map((item) => (
                <Box key={item.id} px={1}>
                    <Card key={item.id} sx={{ maxWidth: 160 }} elevation={4}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '16px', fontWeight: 'bolder', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {item.categoryName}
                            </Typography>
                            <CardMedia
                                sx={{ height: 120, width: 160 }}
                                image={item.categoryImageSlug[0]}
                                title="green iguana"
                            />
                        </CardContent>
                    </Card>
                </Box>
            ))} */}
        </>
    )
}

export default CategoryCard;