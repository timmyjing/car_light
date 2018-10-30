import React from 'react';
import {withRouter, Link} from 'react-router-dom';


class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.getSearchParams = this.getSearchParams.bind(this);

    const {minPrice, maxPrice} = this.getSearchParams();
    this.state = {
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 10000
    }
  }


  handleInput(e, price) {
    e.preventDefault();
    const value = parseInt(e.target.value);

    if (price === "min") {
      this.setState({minPrice: value});
    } else {
      this.setState({maxPrice: value});
    }
  }


  getSearchParams() {
    const {search} = this.props.location;
    if (!search) return {minPrice: null, maxPrice: null};
    const searchParams = search.split('&');
    const minPrice = parseInt(searchParams[1].split("=")[1]);
    const maxPrice = parseInt(searchParams[2].split("=")[1]);
    return {minPrice, maxPrice};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location !== this.props.location) {
      const {minPrice, maxPrice} = this.getSearchParams();
      this.setState({minPrice, maxPrice});
    }

  }

  render() {
    const {minPrice, maxPrice} = this.state;
    console.log(this.props.history);

    return (
      <form className="search-filters">
        <h2>Search by Price</h2>
        <h3>Min Price ($)</h3>
        <input type="number" className="price-filter" onChange={e => this.handleInput(e, "min")} value={this.state.minPrice} min="0" max="100000" />
        <h3>Max Price ($)</h3>
        <input type="number" className="price-filter" onChange={e => this.handleInput(e, "max")} value={this.state.maxPrice} min="0" max="100000" />        
        <div className="link-btn" onClick={ () => this.props.history.push(`/listings?page=1&price_min=${minPrice}&price_max=${maxPrice}`)}>Search <i className="fas fa-search"></i></div>
      </form>
    )
  }
}


export default withRouter(SearchForm);