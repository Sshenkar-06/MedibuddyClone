import { Box, Button, Card, CardContent, Checkbox, Container, Grid, Modal, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import AddPatientDetails from '../components/AddPatientDetails'
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import BillBreakDown from '../components/billBreakdown';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const PatientDetails = () => {
    const [patientList, setPatientList] = useState([]);
    const { userId } = useContext(AuthContext);
   console.log("userId",userId);

    const [open, setOpen] = useState(false);
    const handleModalOpen = () => setOpen(true);
    const handleModalClose = () => setOpen(false);

    // useEffect(() => {
    //     getPatientList();
    // }, [])

    useEffect(() => {
        getPatientList();
    }, [open])

    function getPatientList() {
        const URL = `http://localhost:3000/patient-list?id=${userId}`
        axios.get(URL).then((resp) => {
            if (resp && resp.data && resp.data.length > 0) {
                setPatientList(resp.data[0].patients)
            }
        })
    }

    return (
        <>
            <Container>
                <Grid container spacing={2} mt={2}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Box display='flex' justifyContent='space-between' mb={1} p={2}>
                            <Typography variant='h6' fontWeight='bold'>Who it it for ?</Typography>
                            <Button variant="outlined" startIcon={<Add />} onClick={handleModalOpen}>
                                Add
                            </Button>
                        </Box>
                        <Grid container spacing={2}>
                            {patientList.map((patient,index) => (
                                <Grid size={{ xs: 6, md: 4 }}>
                                    <Card key={index} sx={{ cursor: 'pointer', }}>
                                        <CardContent>
                                            <Box display='flex' justifyContent='space-between' padding='2'>
                                                <Box>
                                                    <Typography variant='h6' fontWeight='bold'>{patient.name}</Typography>
                                                    <Typography sx={{mt:1}} variant='body2'>{patient.relation}</Typography>
                                                </Box>
                                                <Radio />

                                            </Box>
                                        </CardContent>
                                    </Card>


                                </Grid>
                            ))

                            }

                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 6, md: 4 }}>
                        <BillBreakDown></BillBreakDown>
                    </Grid>
                </Grid>


                <Modal open={open} onClose={handleModalClose}>
                    <Box sx={{ width: 500, p: 3, bgcolor: 'background.paper', mx: 'auto', mt: 2, borderRadius: 2 }}>
                        <AddPatientDetails onClose={handleModalClose}></AddPatientDetails>
                    </Box>
                </Modal>
            </Container>


        </>

    )

}

export default PatientDetails
