import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { NavLink } from 'react-router-dom';



const Home = () => {
    const navItems = [
        { label: "Talk To Doctor", link: "", icon: "https://www.medibuddy.in/assets/services/doctor.svg" },
        { label: "Medicine", link: "order-medicine", icon: "https://www.medibuddy.in/assets/services/medicine.svg" },
        { label: "Book Dr. Appointment", link: "", icon: "https://www.medibuddy.in/assets/services/consulation.svg" },
        { label: "Lab Test & Packages", link: "", icon: "https://www.medibuddy.in/assets/services/labtest.svg" },
        { label: "Surgery", link: "", icon: "https://www.medibuddy.in/assets/services/surgery.svg" },
        { label: "Medizen Gold", link: "", icon: "https://www.medibuddy.in/assets/services/mb-gold.svg" },
    ]

    return (
        <>
            <Container maxWidth="lg">
                <AppBar position="static" elevation='0' sx={{
                    backgroundColor: '#fff', padding: '10px', width
                        : '80%', margin: '10px auto'
                }}>
                    <Toolbar>

                        <Box>
                            {
                                navItems.map((item, index) => (
                                    <Button>
                                        <Box key={index} sx={{ marginLeft: 2 }}>
                                          <NavLink to={item.link}>                                            
                                            <img src={item.icon} alt="" style={{ width: 40, height: 40, marginBottom: 2 }} />
                                            <Typography variant='body2' sx={{ color: 'black', fontWeight: '600', fontSize: '13px' }}>{item.label}</Typography>
                                          </NavLink>
                                        </Box>

                                    </Button>
                                ))
                            }


                        </Box>
                    </Toolbar>
                </AppBar>

                <Box className='consult-box' elevation='4'>

                    <Typography variant='h6'> Consult with Top Doctors Online, 24x7</Typography>
                    <a className='consult-link'>Start Consultation <ArrowForwardIcon sx={{ marginLeft: 2 }} /></a>

                </Box>

                <Box sx={{ marginTop: 3 }}>
                    <img src="https://views.medibuddy.in/mb-config/IMAGE/surgery_revamped_banner_1741548411366.png" alt="" style={{ width: '100%' }} />
                </Box>

                <Box sx={{ marginTop: 3 }}>
                    <img src="https://views.medibuddy.in/dynamic-banner/medibuddyHomeFirstFoldWebABHA.svg" alt="" />
                </Box>



                <Box sx={{ marginTop: 3, border: 2 }}>
                    {/* <Grid container spacing={4}>
                        <Grid xs={12}  md={6}>
                            <Typography variant='h4' sx={{border:'2px solid red'}}>Give the care your family deserves</Typography>
                            <Typography variant='body1'> Unlimited Consultations with top Doctors for 6 family members in 22+ specialities and 16 languages</Typography>
                        </Grid>



                        <Grid item xs={12}  md={6} sx={{border:'2px solid red'}}>
                        <Typography variant='h4' sx={{border:'2px solid red'}}>Test</Typography>

                        </Grid>
                    </Grid> */}

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 6, md: 6 }} sx={{border:'2px solid red'}}>
                            <Typography variant='h5'>Give the care your family deserves</Typography>

                            <Typography variant='body1'>Unlimited Consultations with top Doctors for 6 family members in 22+ specialities and 16 languages</Typography>
                        </Grid>
                        <Grid size={{ xs: 6, md: 6 }} sx={{border:'2px solid blue'}}>
                        <Typography variant='h6'>Heading 2</Typography>
                        </Grid>
                    </Grid>    
                </Box>
            </Container>
        </>

    )
}

export default Home;