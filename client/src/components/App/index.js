import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import Review from '../Review';
import MyPage from '../MyPage';
import Search from '../Search';

const App = () => {
  return (
    <div>
    <Router>
      <div>
      <Routes>
        <Route path="/Review" element={<Review />} />
        //<Route path="/MyPage" element={<MyPage />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/" element={<Landing />} />
      </Routes>
      </div>
    </Router>
    </div>
  );
};
export default App;
