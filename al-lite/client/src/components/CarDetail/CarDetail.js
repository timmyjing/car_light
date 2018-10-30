import React from 'react';
import {withRouter} from 'react-router-dom';
import Carousel from '../Carousel/Carousel';


class CarDetail extends React.Component {
  constructor(props) {
    super(props);
    const {state} = this.props.location;
    this.state = {
      photoNo: 0,
      views: state ? state.views : 0,
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
        .then(res => this.setState({views: res.views}));
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
        .then(res => this.setState({views: res.views}));
  }

  handlePhotoChange(dir) {

    const {photo_urls} = this.props.location.state;

    let photoNo = this.state.photoNo + dir;

    if (photoNo === photo_urls.length) {
      photoNo = 0;
    }

    if (photoNo === -1) {
      photoNo = photo_urls.length - 1;
    }

    this.setState({photoNo});
  }


  render() {
    if (this.props.location.state === undefined) {
      this.props.history.goBack();
      return null;
    };

    const {condition, dealer_name, display_color, make, mileage,
      photo_urls, price, model, primary_photo_url, city, state, year, vin, trim, body_type} = this.props.location.state;

    const {photoNo, views} = this.state;
  
    return (
      <div className="car-detail-container">
        <div className="car-detail-card">
          <Carousel photoUrls={photo_urls} photoNo={photoNo} handlePhotoChange={this.handlePhotoChange} primary_photo_url={primary_photo_url} />
          <div className="car-detail-info">
            <div className="left-align">
              <h4>{year} {make} {model}</h4>
              <p className="detail-subtext">{mileage} | {city}, {state}</p>
            </div>

            <div className="right-align">
              <h4>{price}</h4>
            </div>
          </div>
        </div>
        <div className="car-detail-info">
          <div className="left-align">
            <p>Trim</p>
            <p>Color</p>
            <p>Body Type</p>
            <p>VIN</p>
            <p>Condition</p>
            <p>Dealer</p>
            <p><i className="fas fa-eye"></i> Views</p>
          </div>

          <div className="right-align">
            <p>{trim}</p>
            <p>{display_color ? display_color : 'N/A'}</p>
            <p>{body_type}</p>
            <p>{vin}</p>
            <p>{condition}</p>
            <p>{dealer_name}</p>
            <p>{views} </p>
          </div>
        </div>
      </div>
    );
  }
}


export default withRouter(CarDetail);