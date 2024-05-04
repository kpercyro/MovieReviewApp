import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const ReviewTitle = (props) => {

  const handleTitleChange = (event) => {
    props.setEnteredTitle(event.target.value);
    props.setTitleError('');
  };

  return (
    <>
    <Grid item xs={12}>
        <Typography>Enter the title of your review:</Typography>
        <TextField value={props.enteredTitle} label = "Review Title" sx={{minWidth: 500}} onChange={handleTitleChange} />
        {props.titleError && <Typography style={{ color: 'red' }}>{props.titleError}</Typography>}
    </Grid>
    </>
  );
}

export default ReviewTitle;