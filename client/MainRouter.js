import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import Legal from './Legal/Legal'
import Event from './core/EventPage'
//import EventInfo from './event/info'
import Place from './core/PlacePage'
//import PlaceInfo from './place/Info'
import People from './user/FindPeople'
//import Agent from './core/AgentPage'

const MainRouter = () => {
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/events" component={Event}/>
        <Route path="/places" component={Place}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
        {/*<Route path="/events/:eventId" component={EventInfo}/>*/}
        {/*<Route path="/places/:placeId" component={PlaceInfo}/>*/}
        <Route path="/legal" component={Legal}/>
        <Route path="/people" component={People}/>
      </Switch>
    </div>)
}

export default MainRouter
