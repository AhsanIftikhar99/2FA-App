import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../helper/Constants';

const TwoFaCode = ({ code, setCodes, icon , allCodes , index}) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    localStorage.setItem(`expiration_${code.id}`, code.expiration.toString());
  }, [code]);

  const resetTime = () => {
    setCodes((prevCodes) => {
      const expiredIndex = prevCodes.findIndex((c) => c.expiration <= Math.floor(Date.now() / 1000));
      console.log("expiredIndex", expiredIndex);
      if (expiredIndex !== -1) {
        const newExpiration = calculateNewExpiration();
        const newCode = generateNewCode();

        // Update localStorage for the specific code using code.id
        localStorage.setItem(`expiration_${prevCodes[expiredIndex].id}`, newExpiration.toString());

        // Update the code in the state
        const updatedCodes = [...prevCodes];
        updatedCodes[expiredIndex] = { ...updatedCodes[expiredIndex], code: newCode, expiration: newExpiration };
        console.log('updatedCodesn updating', updatedCodes);
        localStorage.setItem('codes', JSON.stringify(updatedCodes));
        return updatedCodes;
      }

      return prevCodes;
    });

    setKey((prevKey) => prevKey + 1);
  };

  const calculateNewExpiration = () => {
    return Math.floor(Date.now() / 1000) + 60;
  };

  const generateNewCode = () => {
    return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000).toString();
  };

  const calculateRemainingTime = () => {
    const storedExpiration = localStorage.getItem(`expiration_${code.id}`);
    const expiration = storedExpiration ? parseInt(storedExpiration, 10) : calculateNewExpiration();
    return Math.max(0, expiration - Math.floor(Date.now() / 1000));
  };

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TWO_FA_CODE,
    item: { codeId: code.id, index }, 
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TWO_FA_CODE,
    hover: (draggedItem) => {
      const draggedIndex = draggedItem.index;
      const hoverIndex = index; 

      if (draggedIndex !== hoverIndex) {
        const newCodes = [...allCodes];
        const draggedCode = newCodes[draggedIndex];

        // Swap the positions of the dragged code and the hovered code
        newCodes[draggedIndex] = newCodes[hoverIndex];
        newCodes[hoverIndex] = draggedCode;

        setCodes(newCodes);
        localStorage.setItem('codes', JSON.stringify(newCodes));
        draggedItem.index = hoverIndex;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      <Paper className='two-fa-code-paper' elevation={3}>
        <Grid container className='two-fa-code-container'>
          <Grid item xs={0.5}></Grid>
          <Grid className='.two-fa-code-icon' item xs={1.5}>
            {icon}
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4} className='.two-fa-code-text'>
            <Typography color={'#FFA500'} variant="body2">
              {code.name}
            </Typography>
            <Typography variant="h4">{code.code}</Typography>
          </Grid>

          <Grid item xs={3.5} container alignItems="center" justifyContent="flex-end" >
            <CountdownCircleTimer
              style={{ marginRight: '10px' }}
              key={key}
              size={50}
              isPlaying
              duration={calculateRemainingTime()}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[40, 30, 10, 0]}
              onComplete={resetTime}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </Grid>
          <Grid item xs={0.5}></Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default TwoFaCode;
