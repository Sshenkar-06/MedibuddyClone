import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MedicineCard from "../components/MedicineCard";

const ShopByCategory = () => {
    const {categoryName} = useParams();
    const [categoryList, setCategoryList] = useState([]);
    const [medicineList,setMedicineList] = useState([]);
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        getCategorySections();
    }, []);

    useEffect(() => {
        if (categoryList.length > 0) {
            const categoryId = categoryName.split('-').pop();
            const index = categoryList.findIndex((item) => item.categoryId == categoryId);
            if (index != -1) {
                setSelected(index);
            }

            getMedicinesByCategoryId(categoryId);
        }
    }, [categoryName, categoryList]);


    function getCategorySections() {
        const URL = "http://localhost:3000/category";
        axios.get(URL).then((resp) => {
            if (resp) {
                setCategoryList(resp.data);
            }
        }).catch((error) => {
  
        })
    }

    const getMedicinesByCategoryId = async(categoryId) => {
       
        const URL = `http://localhost:3000/medicine-by-category?categoryId=${categoryId}`
        try {
            const resp  =  await axios.get(URL);
            if(resp && resp.data && resp.data.length > 0) {
                setMedicineList(resp.data[0].medicines.records);
                // console.log("response",resp);
            }else {
                alert("No Data Found");
                setMedicineList([]);
            } 
        }catch(error){

        }
    }

    const handleChange = (event, newValue) => {
        setSelected(newValue);
       const category = categoryList[newValue];
       navigate(`/order-medicine/category/${category.categoryName.replace(/\s+/g,'-')}-${category.categoryId}`)
    };

    return (
        <>
            <Container sx={{ marginTop: 5 }}>
                <Box sx={{ width: '100%', maxWidth: '1200px', bgcolor: 'background.paper' }}>
                    <Tabs
                        value={selected}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        {
                            categoryList.map((category) => (

                                <Tab key={category.id} label={category.categoryName}></Tab>
                            ))
                        }
                    </Tabs>
                    <Grid container spacing={2} mt={4}>
                        {medicineList.map((med) => (
                            <MedicineCard key={med.id} medicine={med}></MedicineCard>
                        ))}
                    </Grid>

                </Box>
            </Container>
        </>
    )
}

export default ShopByCategory;