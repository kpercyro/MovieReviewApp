import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


const Landing = () => {

  const movies = [
    {
      title: 'Amadeus',
      posterUrl: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/ce7bb9b9da439025080f0f505448a972_52936a28-d006-4f6a-842c-32dd3c82fe56_500x749.jpg?v=1573587272',
      rating: '★★★★★',
      text: '"Deep and thought-provoking!"',
    },
    {
      title: 'Toy Story',
      posterUrl: 'https://m.media-amazon.com/images/I/71aBLaC4TzL._AC_UF1000,1000_QL80_.jpg',
      rating: '★★★★✩',
      text: '"Astounding and inventive!"',
    },
    {
      title: 'Die Hard',
      posterUrl: 'https://m.media-amazon.com/images/I/71ag1lwtbGL._AC_SY679_.jpg',
      rating: '★★★★★',
      text: '"Action packed!"',
    },
    {
      title: 'Finding Nemo',
      posterUrl: 'https://imgc.allpostersimages.com/img/posters/trends-international-disney-pixar-finding-nemo-one-sheet_u-L-Q1RG0GO0.jpg',
      rating: '★★★★✩',
      text: '"They found Nemo!"',
    },
    {
      title: 'Heat',
      posterUrl: 'https://imgc.allpostersimages.com/img/posters/heat_u-L-F4S6Z30.jpg',
      rating: '★★★★★',
      text: '"Best crime drama ever made!"'
    },
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h6">Movie Review Website</Typography>
          <div style={{ marginLeft: 'auto' }}>
            <Link to="/search" style={{ color: 'inherit', textDecoration: 'none', margin: '0 16px' }}>
              Search
            </Link>
            <Link to="/review" style={{ color: 'inherit', textDecoration: 'none', margin: '0 16px' }}>
              Review
            </Link>
            <Link to="/MyPage" style={{ color: 'inherit', textDecoration: 'none', margin: '0 16px' }}>
              Recommendations
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ textAlign: 'center' }}>
    
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ marginTop: 2, marginBottom: 2 }}>
        Popular This Week!
      </Typography>
      
    </div>
      <Grid container spacing={2} justifyContent="center">
      {movies.map((movie, index) => (
        <Grid item key={index}>
          <Typography variant="h6" align="center">
            {movie.title}
          </Typography>
          <img src={movie.posterUrl} alt={movie.title} style={{ width: '200px', height: '300px' }} />
          <Typography variant="body2" align="center">
            {movie.text}
          </Typography>
          <Typography variant="h4" align="center">
            {movie.rating}
          </Typography>
        
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

export default Landing;
