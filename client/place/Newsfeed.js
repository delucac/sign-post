import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import auth from './../auth/auth-helper'
import PlaceList from './PlaceList'
import {listNewsFeed} from './api-place.js'
import NewPlace from './NewPlace'
import {BrowserView} from "react-device-detect";

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    paddingTop: 0,
    paddingBottom: theme.spacing(3)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  media: {
    minHeight: 330
  }
}))
export default function Newsfeed () {
  const classes = useStyles()
  const [places, setPlaces] = useState([])
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listNewsFeed({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setPlaces(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [])

  const addPlace = (place) => {
    const updatedPlaces = [...places]
    updatedPlaces.unshift(place)
    setPlaces(updatedPlaces)
  }
  const removePlace = (place) => {
    const updatedPlaces = [...places]
    const index = updatedPlaces.indexOf(place)
    updatedPlaces.splice(index, 1)
    setPlaces(updatedPlaces)
  }

    return (
      <Card className={classes.card}>
        <Typography type="title" className={classes.title}>
          Newsfeed
        </Typography>
        <Divider/>
        <BrowserView>
          <NewPlace addUpdate={addPlace}/>
        </BrowserView>
        <Divider/>
        <PlaceList removeUpdate={removePlace} places={places}/>
      </Card>
    )
}

