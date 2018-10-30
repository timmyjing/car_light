import React from 'react';
import {Link} from 'react-router-dom';

const SearchResultsItem = ({listing}) => {
  const {vin, make, model, mileage, photo_urls, price, state, city, views, primary_photo_url, condition, year} = listing;

  const link = {
    pathname: `/cars/vin=${vin}`,
    state: listing,
  };

  return (
    <Link to={link} className="listing-item">
      <img src={photo_urls[0]} alt={`${make} ${model} VIN ${vin}`} 
        onError={(e) => {
          e.target.src = primary_photo_url;
        }}/>
      <div>
        <div className="listing-details">
          <h3>{year} {make} {model}</h3>
          <p>{condition}</p>
          <p><i className="fas fa-eye"></i> Views {!views ? 0 : views}</p>
        </div>

        <div className="listing-details">
          <h3>{price}</h3>
          <p>{city}, {state}</p>
        </div>
      </div>
    </Link>);
}

export default SearchResultsItem;