import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';

const ReviewRating = (props) => {

  //states declarations
  //constants and functions declarations
  
  const handleRatingChange = (event) => {
    props.setSelectedRating(event.target.value);
    props.setRatingError('');
  };

  return (
    <>

    <Grid item xs={12}>
        <Typography>Rate the movie:</Typography>
        
        <RadioGroup row value={props.selectedRating} onChange={handleRatingChange}>
          {["1", "2", "3", "4", "5"].map((ratingValue) => (
            <FormControlLabel key={ratingValue} value={ratingValue.toString()} control={<Radio />} label={ratingValue.toString()} />
          ))}
        </RadioGroup>
        {props.ratingError && <Typography style={{ color: 'red' }}>{props.ratingError}</Typography>}
      </Grid>
    </>
  );
}

export default ReviewRating;