import React from 'react';

const Carousel = ({handlePhotoChange, photo, primary_photo_url}) => {
  return (
  <div className="carousel-container">
    <i className="fas fa-chevron-left carousel-button" onClick={() => handlePhotoChange(-1)}></i>
    <img src={photo}
      onError={(e) => {e.target.src = primary_photo_url;}} />
    <i className="fas fa-chevron-right carousel-button" onClick={() => handlePhotoChange(1)}></i>
  </div>);
};

export default Carousel;