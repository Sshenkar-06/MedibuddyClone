import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MedicineCard from "../components/MedicineCard";

const SearchResults = () => {
    const { searchKey } = useParams();
    const [medicinList, setMedicineList] = useState([]);

    useEffect(() => {
        const URL = `http://localhost:3000/medicines?q=${searchKey}`
        axios.get(URL).then((response) => {
            if (response) {
                setMedicineList(response.data);
            }
        }).catch((error) => {
            console.log("error", error.message);
        })
    }, [searchKey])

    return (
        <>
            <Container>
                <Typography sx={{ marginTop: 2, fontSize: '18px' }} level="body-lg">Showing   item(s) for {searchKey}</Typography>
                <Grid container spacing={2} mt={2}>
                    {medicinList.map((med) => (
                           <MedicineCard key={med.id} medicine={med}></MedicineCard>
                        // <Grid item xs={6} sm={12} md={12} sx={{border:2}}>
                        //      <MedicineCard medicine={med}></MedicineCard>
                        // </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default SearchResults;