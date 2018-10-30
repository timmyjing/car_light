import React from 'react';

const Carousel = ({handlePhotoChange, photo, primary_photo_url}) => {
  return (
  <div className="carousel-container">
    {/* <div className="carousel-button" onClick={handlePhotoChange}> */}
      <i className="fas fa-chevron-left carousel-button"></i>
    {/* </div> */}
    <img src={photo}
      onError={(e) => {e.target.src = primary_photo_url;}} />
    {/* <div className="carousel-button" onClick={handlePhotoChange}> */}
      <i className="fas fa-chevron-right carousel-button"></i>
    {/* </div> */}
  </div>);
};

export default Carousel;