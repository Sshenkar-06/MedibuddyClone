import React, { useState, useRef, useEffect, useContext } from "react";
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const LoginComponent = ({ closeModal }) => {
    const { login } = useContext(AuthContext);
    const [otpSent, setOtpSent] = useState(false);
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [otpGenerated, setOtpGenerated] = useState('');
    const [timer, setTimer] = useState(60);
    const timerRef = useRef(null);
    const navigate = useNavigate();

    function sendOtp() {
        if (!mobile || mobile.length < 10 || mobile.length > 10) {
            alert("Please Enter Valid Mobile Number");
            return;
        }

        const otpGenerated = Math.floor(1000 + Math.random() * 9000);
        console.log("Otp", otpGenerated);
        setOtpGenerated(otpGenerated);
        setOtpSent(true);
    }

    useEffect(() => {
        if (otpSent && timer > 0) {
            timerRef.current = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000)
        }
        return () => clearInterval(timerRef.current);
    }, [otpSent]);

    useEffect(() => {
        if (timer == 0) {
            clearInterval(timerRef.current)
        }
    }, [timer])

    function verifyOtp() {
        if (otpGenerated == otp) {
            const URL = "http://localhost:3000/users";
            var data = {
                userId: Math.floor(100000 + Math.random() * 900000),
                mobileNumber: mobile,
                otpVerified: true,
                otpVerifiedDate: new Date()
            }
            axios.post(URL, data).then((resp) => {
                if (resp) {
                    login(data.userId);
                    alert("OTP verified successfully");
                    closeModal();
                    navigate("/cart");
                }
            })
        } else {
            alert("Please Enter Valid OTP");
        }

    }

    return (
        <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Login
            </Typography>
            {
                !otpSent && <div>
                    <FormControl sx={{ width: '100%', marginTop: 1 }}>
                        <InputLabel htmlFor="component-outlined">Mobile Number</InputLabel>
                        <OutlinedInput
                            id="component-outlined"
                            defaultValue=""
                            label="Name"
                            onChange={e => setMobile(e.target.value)}
                        />
                        <FormHelperText id="my-helper-text">OTP will be shared for verification.</FormHelperText>
                    </FormControl>
                    <Button variant="contained" sx={{ marginTop: 2 }} onClick={sendOtp}>Login</Button>
                </div>
            }


            {
                otpSent && <div>
                    <FormControl sx={{ width: '100%', marginTop: 2 }}>
                        <InputLabel htmlFor="component-outlined">Enter OTP</InputLabel>
                        <OutlinedInput
                            id="component-outlined"
                            defaultValue=""
                            label="Name"
                            onChange={e => setOtp(e.target.value)}
                        />
                        <FormHelperText id="my-helper-text">OTP will be valid for {timer}s.</FormHelperText>

                    </FormControl>
                    <Button variant="contained" sx={{ marginTop: 2 }} onClick={verifyOtp}>Verify</Button>


                </div>


            }



        </>
    )

}

export default LoginComponent;