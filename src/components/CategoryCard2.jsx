import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid } from "@mui/material";
import Slider from "react-slick";


const CategoryCard2 = (props) => {
    const { categories } = props;
    console.log(props);
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows: true,

    }
    return (
        <>
            <Container>
                <Slider {...settings}>
                    {/* <Grid container spacing={2} mt={2}> */}

                    {categories.map((item) => (
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
                    ))}
                    {/* </Grid> */}

                </Slider>
            </Container>

        </>
    )
}

export default CategoryCard2;