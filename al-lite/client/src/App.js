import React, { Component } from 'react';
import {Route, Switch} from 'react-router';
import './App.css';
import HomePage from './components/Home/HomePage';
import SearchResultsIndex from './components/SearchResults/SearchResultsIndex';
import CarDetail from './components/CarDetail/CarDetail';
import {withRouter} from 'react-router-dom';

class App extends Component {
  render() {

    const {pathname} = this.props.location;

    return (
      <div className="App">
        <header className="App-header">
          { pathname.indexOf('car') !== -1 ? 
          <div onClick={ () => this.props.history.goBack()}><i className="fas fa-chevron-left"></i> Back to Search</div> : 
          <div onClick={ () => this.props.history.push('/')} className="autolist-logo"></div> }
        </header>
        <Switch>
          {/* <Route exact={true} path="/" component={HomePage} /> */}
          <Route path="/listings" component={SearchResultsIndex} />
          <Route path="/cars" component={CarDetail} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
