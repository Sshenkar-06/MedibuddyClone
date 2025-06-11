import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import { CartContext } from '../context/CartContext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AuthContext } from '../context/AuthContext';
const Header = () => {
  const [medicineList, setMedicineList] = useState([]);
  const [searchText, setSerarchText] = useState("");
  const navigate = useNavigate();
  const {cartCount} = useContext(CartContext);
  const {isAuthenticated} = useContext(AuthContext);

  useEffect(() => {
    //o x y
    const timeOutRef = setTimeout(() => {
      fetchDataFromServer()
    }, 500);

    return () => clearTimeout(timeOutRef);
  }, [searchText]);

  function fetchDataFromServer() {
    const URL = `http://localhost:3000/medicines?q=${searchText}`
    axios.get(URL).then((response) => {
      if (response) {
        setMedicineList(response.data);
      }
    }).catch((error) => {
      console.log("error", error.message);
    })
  }

  function redirctTo(event) {
    if (searchText != "") {
      navigate(`/order-medicine/search/${searchText}`)
    }
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#ffffff', color: 'black' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MediZen
            </Typography>

            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              sx={{ width: 350, borderRadius: 20, padding: 1 }}
              options={medicineList}
              getOptionLabel={(option) => option.name}
              onInputChange={(e, value) => setSerarchText(value)}
              onChange={(e) => redirctTo(e)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search"
                  placeholder="Find Medicine , health products, &more"
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      type: 'search',
                    },
                  }}
                />
              )}
            />

            <NavLink to='/cart'>
              <IconButton color="primary" aria-label="add to shopping cart">
                <Badge badgeContent={cartCount} color="primary">
                  <AddShoppingCartIcon />
                </Badge>
              </IconButton>
            </NavLink>
            <Button color="inherit">About Us</Button>
            {
              !isAuthenticated ?   <Button color="inherit">Login</Button> :
              <div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={<ArrowDropDownIcon />}
              >
                My Account
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
            }
          
           
          </Toolbar>
        </AppBar>
      </Box>
    </>

  )
}

export default Header;