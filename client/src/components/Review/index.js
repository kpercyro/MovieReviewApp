import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const serverURL = "";

const Review = () => {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    callApiGetMovies()
    .then(res => {
      var parsed = JSON.parse(res.express);
      setMovies(parsed);
    })
  }

  const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json()
    return body
  }
  
  const [movieName, setMovieName] = React.useState('');

  const findMovieTitle = () => {
    let movieTitle = '';
    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
      if (selectedMovie === movie.id) {
        movieTitle = movie.name;
      }
    }
    setMovieName(movieTitle);
  }
  
  const callApiAddReview = async () => {
    const url = serverURL + "/api/addReview";
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userID,
          movieID: selectedMovie,
          reviewTitle: enteredTitle,
          reviewContent: enteredReview,
          reviewScore: selectedRating
        })
      });
  
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    };


  const [selectedMovie, setSelectedMovie] = React.useState('');
  const [enteredTitle, setEnteredTitle] = React.useState('');
  const [enteredReview, setEnteredReview] = React.useState('');
  const [selectedRating, setSelectedRating] = React.useState('');
  const [userID, setUserID] = React.useState(1);

  const [movieError, setMovieError] = React.useState('');
  const [titleError, setTitleError] = React.useState('');
  const [bodyError, setBodyError] = React.useState('');
  const [ratingError, setRatingError] = React.useState('');

  const[isSubmitted, setIsSubmitted] = React.useState(false)
  const[submittedRev, setSubmittedRev] = React.useState([]);

  const updateSubmittedRev = () => {
    setUserID(userID + 1);
    setSubmittedRev([movieName, enteredTitle, enteredReview, selectedRating]);
  };

  const handleSubmit = () => {
    
    if (selectedMovie === '') {
      setMovieError('Select your movie');
    }

    if (enteredTitle === '') {
      setTitleError('Enter your review title');
    }

    if (enteredReview === '') {
      setBodyError('Enter your review');
    }

    if (selectedRating === '') {
      setRatingError('Select the rating');
    }
    if(selectedRating !== '' && enteredReview !== '' && enteredTitle !== '' && selectedMovie !== '')  {
      setIsSubmitted(true); 
      updateSubmittedRev();
      setSelectedMovie('');
      setEnteredTitle('');
      setEnteredReview('');
      setSelectedRating('');
      callApiAddReview();
      findMovieTitle();
    } else {
      setIsSubmitted(false);
    }
  };


  return (
    <div >
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h6">Movie Review Website </Typography>
          <div style={{ marginLeft: 'auto' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none', margin: '0 16px' }}>
              Landing
            </Link>
            <Link to="/search" style={{ color: 'inherit', textDecoration: 'none', margin: '0 16px' }}>
              Search
            </Link>
            <Link to="/MyPage" style={{ color: 'inherit', textDecoration: 'none', margin: '0 16px' }}>
              Recommendations
            </Link>
          </div>
        </Toolbar>
      </AppBar>
<div style={{ marginLeft: '20px' }}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <div>
        <h1>Enter a Review</h1>
        <h4>Enter Information to Save to the Database:</h4>
      </div>
      </Grid>
      <MovieSelection movies = {movies} selectedMovie = {selectedMovie} setSelectedMovie = {setSelectedMovie} movieError = {movieError} setMovieError = {setMovieError} movieName = {movieName} setMovieName = {setMovieName}/>
      <ReviewTitle enteredTitle = {enteredTitle} setEnteredTitle = {setEnteredTitle} titleError = {titleError} setTitleError = {setTitleError}/>
      <ReviewBody enteredReview = {enteredReview} setEnteredReview = {setEnteredReview} bodyError = {bodyError} setBodyError = {setBodyError}/>
      <ReviewRating selectedRating = {selectedRating} setSelectedRating = {setSelectedRating} ratingError = {ratingError} setRatingError = {setRatingError}/>

      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </Grid>

      <Grid item xs={12}>
      {isSubmitted && (
        <div>
          <Typography variant="h6" color = "green">
            Your review has been received!
          </Typography>
          <Typography variant="body1">
            <strong>Selected movie:</strong> {movieName}
          </Typography>
          <Typography variant="body1">
            <strong>Review Title:</strong> {submittedRev[1]}
          </Typography>
          <Typography variant="body1">
            <strong>Review Body:</strong> {submittedRev[2]}
          </Typography>
          <Typography variant="body1">
            <strong>Review Rating:</strong> {submittedRev[3]}
          </Typography>
          
        </div>
      )}
      
      </Grid>
      
    </Grid>
    </div>
    </div>
  );
};
export default Review;