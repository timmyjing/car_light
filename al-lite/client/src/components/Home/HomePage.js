import React from 'react';
import SearchForm from '../Search/SearchForm';


const HomePage = () => {
  return (
    <div className="home-splash">
      <div>
        <h1>Find your dream car</h1>
        <h2>Search multiple new & used car websites in one easy search</h2>
      </div>
      <SearchForm />
    </div>);
}


export default HomePage;