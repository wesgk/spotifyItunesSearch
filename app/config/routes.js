import React from 'react'
import ReactRouter, { Router, Route, hashHistory, HistoryLocation, IndexRoute } from 'react-router'
import MainContainer from '../containers/MainContainer'
import LoginSpotifyContainer from '../containers/LoginSpotifyContainer'
import SearchContainer from '../containers/SearchContainer'

const routes = (  
  <Router history={hashHistory}>
    <Route path='/' component={MainContainer}>
      <IndexRoute component={SearchContainer} />
      <Route path='login' component={LoginSpotifyContainer}></Route>
      <Route path='search' component={SearchContainer}></Route>
    </Route>
  </Router>
);

export default routes