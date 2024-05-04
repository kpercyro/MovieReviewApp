import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const ReviewBody = (props) => {

  //states declarations
  //constants and functions declarations
  
  const handleBodyChange = (event) => {
    props.setEnteredReview(event.target.value);
    props.setBodyError('');
  };


  return (
    <>
     <Grid item xs={12}>
        <Typography>Enter the body of your review:</Typography>
        <TextField value={props.enteredReview} sx={{minWidth: 500}} label = "Review Body" inputProps={{maxLength: 200}} onChange={handleBodyChange} multiline rows={4}  />
        {props.bodyError && <Typography style={{ color: 'red' }}>{props.bodyError}</Typography>}
      </Grid>
    </>
  );
}

export default ReviewBody;