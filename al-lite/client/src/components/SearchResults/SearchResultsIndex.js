import React from 'react';
import {withRouter} from 'react-router-dom';
import SearchResultsItem from './SearchResultsItem';
import {Link} from 'react-router-dom';
import SearchForm from '../Search/SearchForm';
import LoadingSpinner from '../UI/SpinninRims';
import {API_KEY} from '../../config/keys.js';

class SearchResultsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      listings: null,
      numResults: 0
      // pageNo: null, no need for now since we have page number from props
    }
    this.getPageNumber = this.getPageNumber.bind(this);
    this.getNextPages = this.getNextPages.bind(this);
    this.fetchListings = this.fetchListings.bind(this);
    this.fetchViews = this.fetchViews.bind(this);
  }

  componentDidMount() {
    this.fetchListings();
  }

  fetchListings() {
    const {search} = this.props.location;

// fetch listings...then fetch views from own backend
    const myInit = {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY},
      mode: 'cors',
      cache: 'default'};

    const url = `https://qa878qmgjk.execute-api.us-east-1.amazonaws.com/dev${search}`;

    fetch(url, myInit)
      .then(res => res.json())
        .then(data => this.fetchViews(data));
  }


  fetchViews(data) {

    if (data.status === 500) {
      this.setState({listings: null, loading: false, numResults: 0});
      return null;
    }

    const vins = data.records.map( e => e.vin);
    
    let url = `http://localhost:3001/cars/?`;

    const myInit = {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `http://localhost:3001`},
      mode: 'cors',
      cache: 'default'};


    vins.forEach( (vin, idx) => {
      url += `vin[]=${vin}`;
      if (idx !== vins.length - 1) url += '&';
    });

    fetch(url, myInit)
      .then(res => res.json())
        .then(cars => {
          let newListings = [...data.records];
          cars.forEach( car => {
            // maybe find a way to normalize state? not sure if worth trouble to convert to byId and allId for now
            newListings.forEach( listing => {
              if (listing.vin === car.vin) listing.views = car.views; 
            });
          });
          this.setState({listings: newListings, loading: false, numResults: data.total_count_formatted, totalCount: data.total_count});
        });

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.search !== prevProps.location.search) {
      this.setState({loading: true});
      this.fetchListings();
    }
  }

  componentWillUnmount() {
    console.log('bye');
  }


  // regex to extract page number
  getPageNumber() {
    const {search} = this.props.location;
    const regexp = /(?:page)=(\d+)(?:&)/;

    const matches = regexp.exec(search);

    if (!matches) return matches;

    return parseInt(matches[1]);
  }

  getNextPages() {
    let {search} = this.props.location;
    search = search.split('&');

    const currPage = this.getPageNumber();

    if (!currPage) return null;

    let nextPages = [-1, 0, 1, 2];
    if (currPage === 1) {
      nextPages = [0, 1, 2];
    } else if (currPage === 249) {
      nextPages = [-2,-1,0];
    }

    nextPages = nextPages.map( page => page + currPage);

    if (currPage !== 1 && nextPages.indexOf(1) === -1) nextPages.unshift(1);

    if (currPage !== 249 && nextPages.indexOf(249) === -1) nextPages.push(249);

    return (
      <div className="search-result-pages">
        {nextPages.map( page => {
          if (page !== currPage) {
            return <Link className="search-page-link" key={`page-${page}`} to={`/listings?page=${page}&${search[1]}&${search[2]}`}> {page} </Link>;
          } else {
            return <div className="search-page-current" key={`page-${page}`}>{currPage}</div>;
          }
          })}
      </div>)
    ;
  }
 
  render() {

    let {listings, numResults} = this.state;

    listings = (!listings || listings.length === 0) ? <h1>No Results Found</h1> : listings.map(listing => <SearchResultsItem listing={listing} key={listing.id}/>);

    return (
      <div className="search-results-container">
        <SearchForm />
        <div className="listings-container">
          {this.state.loading ? null : <p>{numResults} Results Found</p>}
          {this.state.loading ? <LoadingSpinner /> : listings}
          {this.state.loading ? null : this.getNextPages()}
        </div>
      </div>
    )
  }
}



export default withRouter(SearchResultsIndex);

