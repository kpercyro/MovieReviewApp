import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';

const MovieSelection = (props) => {

  const handleMovieChange = (event) => {
    props.setSelectedMovie(event.target.value);
    props.setMovieError('');
  };

  return (
    <>
    <Grid item xs={12}>
        <Typography>Select a movie:</Typography>
        <Select value={props.selectedMovie} sx={{minWidth: 300}} onChange={handleMovieChange}>
          {props.movies.map((movie) => (
            <MenuItem value={movie.id}>{movie.name}</MenuItem>
          ))}
        </Select>
        {props.movieError && <Typography style={{ color: 'red' }}>{props.movieError}</Typography>}
      </Grid>
    
    </>
  );
}

export default MovieSelection;