import React from 'react';
import {withRouter} from 'react-router-dom';
import Carousel from '../Carousel/Carousel';


class CarDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoNo: 0
    }

    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.updateViews = this.updateViews.bind(this);
    this.createViews = this.createViews.bind(this);
  }

  componentDidMount() {
    // post to views backend
    const {state} = this.props.location;

    if (!state) return null;
    
    if (state.views) {
      this.updateViews();      
    } else {
      this.createViews();
    }
  }
  
  createViews() {
    const {vin} = this.props.location.state;

    const url = `http://localhost:3001/cars/?vin=${vin}`;

    const myInit = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `http://localhost:3001`},
      mode: 'cors',
      cache: 'default'};

    fetch(url, myInit)
      .then(res => res.json())
        .then(res => console.log(res));


  }

  updateViews() {
    const {vin} = this.props.location.state;

    const url = `http://localhost:3001/cars/${vin}`;

    const myInit = {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `http://localhost:3001`},
      mode: 'cors',
      cache: 'default'};

    fetch(url, myInit)
      .then(res => res.json())
        .then(res => console.log(res));
  }

  handlePhotoChange(e) {
    e.preventDefault();

    console.log(this.props.location.state);

    const {photo_urls} = this.props.location.state;

    let photoNo;
    console.log(photo_urls[this.state.photoNo])

    if (this.state.photoNo === photo_urls.length - 1) {
      photoNo = 0;
    } else {
      photoNo = this.state.photoNo + 1;
    }

    this.setState({photoNo});
  }


  render() {
    if (this.props.location.state === undefined) {
      this.props.history.goBack();
      return null;
    };

    const {condition, dealer_name, display_color, make, mileage,
      photo_urls, price, model, primary_photo_url, city, state, year, vin, views} = this.props.location.state;

    const {photoNo} = this.state;
  
    return (
      <div className="car-detail-container">
        <div className="car-detail-card">
          {/* <div style={{background: `url(${photo_urls[photoNo]})`}}
            onClick={this.handlePhotoChange}>
          </div> */}
          {/* <img src={photo_urls[photoNo]} alt={`${make} ${model} VIN ${vin}`} 
            onError={(e) => {e.target.src = primary_photo_url;}}
            onClick={this.handlePhotoChange} /> */}
          <Carousel photo={photo_urls[photoNo]} handlePhotoChange={this.handlePhotoChange} primary_photo_url={primary_photo_url} />
          <div className="car-detail-info">
            <div className="left-align">
              <h4>{year} {make} {model}</h4>
              <h4>{mileage} | {city}, {state}</h4>
            </div>

            <div className="right-align">
              <h4>{price}</h4>
              {/* <h4>{city}, {state} </h4> */}
            </div>
          </div>
        </div>
        <div className="car-detail-info">
          <div className="left-align">
            <p>Color</p>
            <p>VIN</p>
            <p>Condition</p>
            <p>Dealer</p>
            <p><i className="fas fa-eye"></i> Views</p>
          </div>

          <div className="right-align">
            <p>{display_color ? display_color : 'N/A'}</p>
            <p>{vin}</p>
            <p>{condition}</p>
            <p>{dealer_name}</p>
            <p>{!views ? 1 : views + 1} </p>
          </div>
        </div>
      </div>
    );
  }
}


export default withRouter(CarDetail);