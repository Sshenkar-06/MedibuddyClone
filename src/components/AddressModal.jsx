import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import AddressList from "./AddressList";
import Address from "./Address";

const AddressModal = ({ close }) => {
    const [showForm, setShowForm] = useState(false);

    function handleAdd(){
        setShowForm(false);
    }


    return (
        <>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant="h6" gutterBottom> Select Address</Typography>
                <Button onClick={() => setShowForm(true)} variant="outlined" startIcon={<Add />}>
                    Add new Address
                </Button>
            </Box>
            <Divider sx={{ marginBottom: 2, marginTop: 2 }}></Divider>
            {
                showForm ? <Address showForm={handleAdd}></Address> : <AddressList closeModal={close}></AddressList>
            }
        </>
    )
}

export default AddressModal;