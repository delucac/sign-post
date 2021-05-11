import React, {useState} from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FollowGrid from './../user/FollowGrid'
import PostList from './../post/PostList'
import EventList from "./../event/EventList"
import PlaceList from "./../place/PlaceList"

export default function ProfileTabs ( props ){
  const [tab, setTab] = useState(0)

  const handleTabChange = (event, value) => {
    setTab(value)
  }

    return (
    <div>
        <AppBar position="static" color="default">
          <Tabs
            value={tab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Posts"/>
            <Tab label="Events"/>
            <Tab label="Places"/>
            <Tab label="Follow"/>
          </Tabs>
        </AppBar>
       {tab === 0 && <TabContainer><PostList removeUpdate={props.removePostUpdate} posts={props.posts}/></TabContainer>}
       {tab === 1 && <TabContainer><EventList removeUpdate={props.removeEventUpdate} events={props.events}/></TabContainer>}
       {tab === 2 && <TabContainer><PlaceList removeUpdate={props.removePlaceUpdate} places={props.places}/></TabContainer>}
       {tab === 3 && <TabContainer>Following: <FollowGrid people={props.user.following}/></TabContainer>}
       {tab === 3 && <TabContainer>Followers: <FollowGrid people={props.user.followers}/></TabContainer>}
    </div>)

}

ProfileTabs.propTypes = {
  user: PropTypes.object.isRequired,
  removePostUpdate: PropTypes.func.isRequired,
  removeEventUpdate: PropTypes.func.isRequired,
  removePlaceUpdate: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  places: PropTypes.array.isRequired
}

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}
