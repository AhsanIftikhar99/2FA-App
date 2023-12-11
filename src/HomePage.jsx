// HomePage.jsx

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import TwoFaCode from './TwoFaCode';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import icons for categories

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Facebook':
      return <FaFacebook size={50} color="#1877f2" />;
    case 'Twitter':
      return <FaTwitter size={50} color="#1DA1F2" />;
    case 'Instagram':
      return <FaInstagram size={50} color="#8a3ab9" />;
    // Add more cases for additional categories
    default:
      return null; // Return null if no matching category is found
  }
};

const HomePage = () => {
  const storedCodes = localStorage.getItem('codes');
  const initialCodes = storedCodes ? JSON.parse(storedCodes) : {};
  const [codes, setCodes] = React.useState(initialCodes);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Button sx={{ color: '#FFA500' }}>Edit</Button>
          <Typography variant="h5" textAlign={'center'} component="div" sx={{ flexGrow: 1, color: 'black' }}>
            Tokens
          </Typography>
          <Button variant="text" sx={{ color: '#FFA500', fontSize: '26px' }}>
            +
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        {Object.values(codes).map((code) => (
          <Grid item key={code.id} xs={12}>
            <TwoFaCode code={code} setCodes={setCodes} icon={getCategoryIcon(code.category)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
