import { Container, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';



const MedicineHome = () => {
    const[categoryList,setCategoryList] = useState([]);  

    useEffect(()=>{
      getCategorySections(); 
    },[]);
    
    function getCategorySections(){
      const URL = "http://localhost:3000/category";
      axios.get(URL).then((resp)=>{
          if(resp){
             setCategoryList(resp.data);
          }
      }).catch((error)=>{

      })
    }


    return (
      <>         
         <Container sx={{marginTop:4}}>
         <Typography gutterBottom variant="h6" component="div" sx={{fontWeight:'bold',marginBottom:4}}>
                     Search By Category  
          </Typography>

          <CategoryCard categories={categoryList}></CategoryCard>
         </Container>
      </>

    )
}

export default MedicineHome;