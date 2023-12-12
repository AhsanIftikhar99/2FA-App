// HomePage.jsx

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid, Paper } from '@mui/material';
import TwoFaCode from './TwoFaCode';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import './App.css'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import getCategoryIcon from '../helper/genFunctions';



const HomePage = () => {
  const storedCodes = localStorage.getItem('codes');
  const initialCodes = storedCodes ? JSON.parse(storedCodes) : {};
  const [codes, setCodes] = React.useState(initialCodes);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  console.log("Code",codes);
  return (
    <DndProvider backend={HTML5Backend}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', height: isSmallScreen ? '50px' : '60px' }}>
        <Toolbar>
          <Button sx={{ color: '#FFA500' }}>Edit</Button>
          <Typography variant="h5" className='app-bar-typography '>
            Tokens
          </Typography>
          <Link to="/add-code" style={{ textDecoration: 'none' }}>
            <Button variant="text" sx={{ color: '#FFA500', fontSize: '26px' }}>
              +
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      {Object.values(codes).length > 0 ? (
        // Render TwoFaCode components if there are codes
        Object.entries(codes).map(([id, code], index) => (
          <TwoFaCode key={id} code={code} index={index} allCodes={codes} setCodes={setCodes} icon={getCategoryIcon(code.category)} />
        ))
      ) : (
        // Render a Paper with a message if there are no codes
        <Paper
          elevation={3}
          className="floating-paper"
        >
          <Typography variant="h6" sx={{ color: 'orange' }}>
            Click on + Button and add some new tokens!
          </Typography>
        </Paper>
      )}
    </Box>
  </DndProvider>
  );
};

export default HomePage;


