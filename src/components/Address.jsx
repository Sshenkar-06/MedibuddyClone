import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Button, TextField } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios";

const Address = ({showForm}) => {
    const { userId } = useContext(AuthContext);
    const [address, setAddress] = useState("");
    const [addressType, setAddressType] = useState("");

//fetch address + address = final AddressList save 

    const saveAddress = async () => {
        let addressList = [];
        const URL = `http://localhost:3000/address-list?id=${userId}`
        const response = await axios.get(URL);
        if (response && response.data && response.data.length > 0) {
            addressList = response.data[0].addresses;
        }

        if (addressList.length == 0) {
            //add new address List
            const PostURL = `http://localhost:3000/address-list`;
            const requestObj = {
                id: userId,
                addresses: [{ address, addressType }]
            }
            const response = await axios.post(PostURL,requestObj);
            if (response) {
                console.log('response from Post', response);
                showForm();
            }
        } else {
            //update existing addressList
            const URL = `http://localhost:3000/address-list/${userId}`
            const requestObj = {
                id:userId,
                addresses: [...addressList, { address, addressType }]
            }
            const responseObj = await axios.put(URL, requestObj);
            showForm();
            console.log("responseObj", responseObj);
        }
    }


    return (
        <>
            <Box sx={{ mt: 2 }}>
                <FormControl fullWidth>
                    <TextField label="Address" id="fullWidth" multiline sx={{ mb: 2 }} value={address} onChange={e => setAddress(e.target.value)} />
                </FormControl>
                <FormControl fullWidth>
                    <FormLabel id="demo-row-radio-buttons-group-label">Save As</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={addressType}
                        onChange={e => setAddressType(e.target.value)}
                    >
                        <FormControlLabel value="home" control={<Radio />} label="Home" />
                        <FormControlLabel value="work" control={<Radio />} label="Work" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <Button sx={{mt:2,padding:1}} variant="contained" onClick={saveAddress}>Save Address</Button>
            </Box>
        </>
    )
}

export default Address;