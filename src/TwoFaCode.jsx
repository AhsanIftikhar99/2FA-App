import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { FaFacebook } from 'react-icons/fa';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const TwoFaCode = ({ code, setCodes, icon }) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(code.expiration));
  const [key, setKey] = useState(0);

  useEffect(() => {
    let animationFrameId;
    const updateTimer = () => {
      setTimeRemaining(getTimeRemaining(code.expiration));
      animationFrameId = requestAnimationFrame(updateTimer);
    };
    animationFrameId = requestAnimationFrame(updateTimer);
    return () => cancelAnimationFrame(animationFrameId);
  }, [code, key]);

  useEffect(() => {
    localStorage.setItem(`expiration_${code.id}`, code.expiration.toString());
  }, [code]);

  const resetTime = () => {
    setCodes((prevCodes) => {
      const updatedCodes = [...prevCodes];
      const index = updatedCodes.findIndex((c) => c.id === code.id);
      if (index !== -1) {
        const newExpiration = calculateNewExpiration();
        updatedCodes[index] = { ...code, code: generateNewCode(), expiration: newExpiration };
      }
      return updatedCodes;
    });
    setKey((prevKey) => prevKey + 1);
  };

  const calculateNewExpiration = () => {
    return Math.floor(Date.now() / 1000) + 60;
  };

  const generateNewCode = () => {
    return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000).toString();
  };

  function getTimeRemaining(expiration) {
    return Math.max(0, expiration - Math.floor(Date.now() / 1000));
  }

  return (
    <Paper sx={{ paddingBottom: '20px' }} elevation={3}>
      <Grid container marginTop={1} spacing={2}>
        <Grid justifyContent={'center'} alignContent={'center'} alignSelf={'center'} item xs={2}>
            {icon}
        </Grid>
        <Grid item xs={6}>
          <Typography color={'#FFA500'} variant="body2">
            {code.name}
          </Typography>
          <Typography variant="h4">{code.code}</Typography>
        </Grid>
        <Grid item xs={4} container alignItems="center" justifyContent="flex-end">
          <CountdownCircleTimer
            style={{ marginRight: '10px' }}
            key={key}
            size={50}
            isPlaying
            duration={code.expiration - Math.floor(Date.now() / 1000)}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[40, 30, 10, 0]}
            onComplete={resetTime}
          >
            {() => timeRemaining}
          </CountdownCircleTimer>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TwoFaCode;