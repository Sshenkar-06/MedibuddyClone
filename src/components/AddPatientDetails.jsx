import React, { useContext, useState } from 'react'
import { Modal, Box, TextField, MenuItem, Select, InputLabel, FormControl, Button, DialogActions, Typography } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const AddPatientDetails = ({onClose}) => {
    const {userId} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: '',
        relation: '',
        mobile: '',
        dob: '',
        gender: '',
    });

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    };

    const handleSave = async() => {

       //check of patients are available against userId
        let patientList = [];
        const URL = `http://localhost:3000/patient-list?id=${userId}`
        const response = await axios.get(URL);
        if (response && response.data && response.data.length > 0) {
            patientList = response.data[0].patients;
        }

        if (patientList.length == 0) {
            //add new patient List
            const PostURL = `http://localhost:3000/patient-list`;
            const requestObj = {
                id: userId,
                patients: [{ ...formData }]
            }
            const response = await axios.post(PostURL,requestObj);
            if (response) {
                console.log('response from Post', response);
                onClose();
            }
        } else {
            //update existing patientList
            const URL = `http://localhost:3000/patient-list/${userId}`
            const requestObj = {
                id:userId,
                patients: [...patientList, { ...formData}]
            }
            const responseObj = await axios.put(URL, requestObj);
            onClose();
            console.log("responseObj", responseObj);
        }

    };

  
    return (
        <>
                <Box sx={{ p:1 }}>
                    <Typography variant="h6" component="h2">Add Family Member Details</Typography>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="relation-label">Relation</InputLabel>
                        <Select
                            labelId="relation-label"
                            name="relation"
                            value={formData.relation}
                            onChange={handleChange}
                            label="Relation"
                        >
                            <MenuItem value="Father">Father</MenuItem>
                            <MenuItem value="Mother">Mother</MenuItem>
                            <MenuItem value="Brother">Brother</MenuItem>
                            <MenuItem value="Sister">Sister</MenuItem>
                            <MenuItem value="Spouse">Spouse</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Mobile Number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Gender</InputLabel>
                        <Select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            label="Gender"
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <DialogActions>
                        <Button variant='contained' onClick={onClose}>Cancel</Button>
                        <Button variant='contained' onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Box>
           
        </>

    )

}

export default AddPatientDetails;