import React from 'react';

const Carousel = ({handlePhotoChange, photoUrls, primary_photo_url, photoNo}) => {

  let numPhotos = photoUrls.length;
  let currPhoto = photoNo + 1;
  return (
  <div className="carousel-container">
    <i className="fas fa-chevron-circle-left carousel-button" onClick={() => handlePhotoChange(-1)}></i>
    <img src={photoUrls[photoNo]} alt=""
      onError={(e) => {e.target.src = primary_photo_url;}} />
    <i className="fas fa-chevron-circle-right carousel-button" onClick={() => handlePhotoChange(1)}></i>
    <div className="carousel-photo-counter">
      <i className="far fa-images"></i> 
      {"  "  + (currPhoto)} of {numPhotos}
    </div>
  </div>);
};

export default Carousel;