import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const serverURL = "";

const Search = () => {
  const [movieTitle, setMovieTitle] = React.useState('');
  const [actorName, setActorName] = React.useState('');
  const [directorName, setDirectorName] = React.useState('');
  const [results, setSearch] = React.useState([]);

  const getSearch = () => {
    callApiGetSearch()
      .then(res => {
        var parsed = JSON.parse(res.express);
        setSearch(parsed);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  };
  
  const callApiGetSearch = async () => {
    const url = serverURL + "/api/getSearch";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieName: movieTitle,
          actorName: actorName,
          directorName: directorName,
        }),
      });
  
      const body = await response.json();
      return body;
    } catch (error) {
      console.error('Error fetching search results:', error);
      throw error; 
    }
  };
  
  const handleSearch = async () => {
    try {
      const searchResults = await getSearch();
      setSearch(searchResults);
      console.log(results)
    } catch (error) {
      console.error('Error handling search:', error);
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
            <Link to="/review" style={{ color: 'inherit', textDecoration: 'none', margin: '0 16px' }}>
              Review
            </Link>
            <Link to="/MyPage" style={{ color: 'inherit', textDecoration: 'none', margin: '0 16px' }}>
              Recommendations
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ marginLeft: '20px' }}>
        <h1>Search Page</h1>
        <h4>Enter any Seach Criteria:</h4>
      </div>
      <div style={{ marginLeft: '20px' }}>
      <input
        type="text"
        placeholder="Enter Movie Title"
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      <input
        style={{ marginLeft: '20px' }}
        type="text"
        placeholder="Enter Actor's Name"
        value={actorName}
        onChange={(e) => setActorName(e.target.value)}
      />
      <input
        style={{ marginLeft: '20px' }}
        type="text"
        placeholder="Enter Director's Name"
        value={directorName}
        onChange={(e) => setDirectorName(e.target.value)}
        
      />
      
        <Button style={{ marginLeft: '20px' }} variant="contained" onClick={handleSearch}>Submit</Button>
      
    </div>

    {results && results.map((result, index) => (
      <div key={index} style={{ marginLeft: '20px' }}>
        <h4>Movie Name: {result.name}</h4>
        <p>Director Name: {result.Directors}</p>
        {result.Reviews && <p>Reviews: {result.Reviews}</p>}
        {result.AverageScore !== null && <p>Average Score: {result.AverageScore}</p>}
        <hr />
      </div>
    ))}
      </div>
  );
};

export default Search;
