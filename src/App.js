import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import logo from './logo.svg';
import Home from "./components/Home";
import Legal from "./components/Legal";
import Privacy from "./components/LegalPolicies/Legal-Privacy";
import Community from "./components/LegalPolicies/Legal-CommunityGuidelines";
import ThirdParty from "./components/LegalPolicies/Legal-3rdPartyResources";
import About from "./components/LegalPolicies/Legal-About";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div>
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </div>
            <Link to="/" className="navbar-brand">SignPost</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/Profile" className="nav-link">Profile</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/search" className="nav-link">Places</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/Legal" className="nav-link">Legal</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact component={Home}/>
          <Route path="/Legal" component={Legal}/>
          <Route path="/Legal/Privacy" component={Privacy}/>
          <Route path="/Legal/CommunityGuidelines" component={Community}/>
          <Route path="/Legal/3rdParty" component={ThirdParty}/>
          <Route path="/Legal/About" component={About}/>
        </div>
      </Router>
    );
  }
}

export default App;
