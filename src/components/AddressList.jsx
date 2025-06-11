import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { CartContext } from "../context/CartContext";

const AddressList = ({closeModal}) => {
    const {userId} = useContext(AuthContext);
    const {handleAddressSel}   = useContext(CartContext);
    const [addressList,setAddressList] = useState([]);

    useEffect(()=> {
        getAddressList();
    },[]);

    function selectAddress(address) {
        handleAddressSel(address);
        closeModal();
    }

    function getAddressList(){
        const URL = `http://localhost:3000/address-list?userId=${userId}`
        axios.get(URL).then((resp)=> {
           if(resp && resp.data){
            setAddressList(resp.data[0].addresses)
           }
        })
    }

    return (
        <>
                  {
                   addressList.map((item)=> (

                    <Box key={item.id} sx={{border:'1px solid #ccc',borderRadius:2,p:2,mb:2,cursor:'pointer'}} onClick={()=> selectAddress(item)}>
                      <Typography fontWeight={'bold'}>{item.addressType}</Typography>
                      <Typography >{item.address}</Typography>


                    </Box>
                   ))
                }

        </>
    )
}

export default AddressList;