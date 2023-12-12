import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper, Select, MenuItem, InputLabel, Alert } from '@mui/material';

const AddCodePage = ({ setCodes }) => {
  const [codeName, setCodeName] = useState('');
  const [codeKey, setCodeKey] = useState('');
  const [category, setCategory] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const isInputValid = codeName.length >= 1 && codeKey.length >= 1 && category.length > 0;

  const addCode = () => {
    if (isInputValid) {
      const randomCode = Math.floor(100000 + Math.random() * 900000);
      const expiration = calculateNewExpiration();
      setCodes((prevCodes) => {
        const newCode = { id: `${Date.now()}`, name: codeName, code: randomCode, expiration, category };
        localStorage.setItem('codes', JSON.stringify([...prevCodes, newCode]));
        setShowAlert(true);
        setCodeName('');
        setCodeKey('');
        setCategory('');
        return [...prevCodes, newCode];
      });
    }
  };

  const calculateNewExpiration = () => {
    return Math.floor(Date.now() / 1000) + 60;
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{ maxWidth: 400, width: '100%', margin: 'auto', padding: 4, textAlign: 'center' }}
      >
        <Typography variant="h5" mb={2}>
          Add New Token
        </Typography>
        <TextField
          sx={{ marginTop: 1 }}
          fullWidth
          label="Account"
          variant="outlined"
          value={codeName}
          onChange={(e) => setCodeName(e.target.value)}
          mb={2}
        />
        <TextField
          sx={{ marginTop: 1 }}
          fullWidth
          label="Key"
          variant="outlined"
          value={codeKey}
          onChange={(e) => setCodeKey(e.target.value)}
          mb={2}
        />
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ marginTop: 1, marginBottom: 2 }}
        >
          <MenuItem value="Facebook">Facebook</MenuItem>
          <MenuItem value="Twitter">Twitter</MenuItem>
          <MenuItem value="Instagram">Instagram</MenuItem>
          <MenuItem value="Reddit">Reddit</MenuItem>
          <MenuItem value="Steam">Steam</MenuItem>
          <MenuItem value="Google">Google</MenuItem>
          <MenuItem value="Microsoft">Microsoft</MenuItem>
        </Select>
        <Button
          sx={{ marginTop: 1 }}
          variant="contained"
          onClick={addCode}
          disabled={!isInputValid}
          mb={2}
        >
          Add 
        </Button>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button
            sx={{ marginTop: 1, marginLeft: 1 }}
            variant="outlined"
          >
            Back to Main Page
          </Button>
        </Link>
      </Paper>
      {showAlert && (
        <Alert severity="success"  onClose={handleCloseAlert} open={showAlert}>
          Token added successfully!
        </Alert>
      )}
    </Box>
  );
};

export default AddCodePage;
