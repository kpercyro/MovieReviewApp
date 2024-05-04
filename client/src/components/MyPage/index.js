import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const serverURL = "";

const MyPage = () => {
  const [genres, setGenres] = React.useState([]);
  const [movies, setMovies] = React.useState([]);


  const [selectedGenre, setSelectedGenre] = React.useState('');
  const [genreError, setGenreError] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState('');

  const [moviesWithSelectedGenre, setMoviesWithSelectedGenre] = React.useState([]);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setGenreError('');
  };

  React.useEffect(() => {
    getGenres();
  }, []);

  const getGenres = () => {
    callApiGetGenres()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setGenres(parsed);
    })
  }

  const callApiGetGenres = async () => {
    const url = serverURL + "/api/getGenres";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json()
    return body
  }
  
  const fetchMoviesByGenre = async (selectedGenre) => {
    try {
      const url = serverURL + "/api/getMoviesByGenre";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ genre: selectedGenre }),
      });
      const data = await response.json();
      return data.express;
    } catch (error) {
      throw error;
    }
  };
  
  const handleSubmit = () => {
    if (selectedGenre) {
      fetchMoviesByGenre(selectedGenre.genre)
        .then((movies) => {
          setMoviesWithSelectedGenre(JSON.parse(movies));
        })
        .catch((error) => {
          console.error('Error fetching movies:', error);
        });
    } else {
      setGenreError('Please select a genre');
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h6">Movie Review Website</Typography>
          <div style={{ marginLeft: 'auto' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none', margin: '0 16px' }}>
              Landing
            </Link>
            <Link to="/search" style={{ color: 'inherit', textDecoration: 'none', margin: '0 16px' }}>
              Search
            </Link>
            <Link to="/review" style={{ color: 'inherit', textDecoration: 'none', margin: '0 16px' }}>
              Review
            </Link>
          </div>
        </Toolbar>
      </AppBar>

      <div style={{ marginLeft: '20px' }}>
        <h1>Recommendations</h1>
        <h4>Select a Genre You Would Like to Watch:</h4>
      </div >
      
      <div style={{ marginLeft: '20px' }}>
      <Grid item xs={12}>
        <FormControl>
        <Select value={selectedGenre} sx={{minWidth: 300}} onChange={handleGenreChange}>
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre}>{genre.genre}</MenuItem>
          ))}
        </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSubmit} style={{ marginLeft: '20px' }}>
          Submit
        </Button>
        {genreError && <Typography style={{ color: 'red' }}>{genreError}</Typography>}
      </Grid>
      </div>
      {moviesWithSelectedGenre.length > 0 && (
        <div style={{ marginLeft: '20px' }}>
          <h2>Movies with Selected Genre:</h2>
          <ul>
            {moviesWithSelectedGenre.map((movie) => (
              <li key={movie.id}>{movie.name}</li>
            ))}
          </ul>
        </div>
      )}
     </div>
   );
 };
 

export default MyPage;
