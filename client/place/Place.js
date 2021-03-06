import React, {useState, useEffect} from 'react'
import auth from './../auth/auth-helper'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import CommentIcon from '@material-ui/icons/Comment'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import {remove, like, unlike} from './api-place.js'
import Comments from './Comments'
import {DeleteForever} from "@material-ui/icons"

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth:600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(0, 0, 0, 0.06)'
  },
  cardContent: {
    backgroundColor: 'white',
    padding: `${theme.spacing(2)}px 0px`
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  text: {
    margin: theme.spacing(2)
  },
  photo: {
    textAlign: 'center',
    backgroundColor: '#f2f5f4',
    padding:theme.spacing(1)
  },
  media: {
    height: 200
  },
  button: {
   margin: theme.spacing(1),
  }
}))

export default function Place (props){
  const classes = useStyles()
  const jwt = auth.isAuthenticated()
  const checkLike = (likes) => {
    let match = likes.indexOf(jwt.user._id) !== -1
    return match
  }
  const [values, setValues] = useState({
    like: checkLike(props.place.likes),
    likes: props.place.likes.length,
    comments: props.place.comments
  })


  // useEffect(() => {
  //   setValues({...values, like:checkLike(props.place.likes), likes: props.place.likes.length, comments: props.place.comments})
  // }, [])

  const clickLike = () => {
    let callApi = values.like ? unlike : like
    callApi({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, props.place._id).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setValues({...values, like: !values.like, likes: data.likes.length})
      }
    })
  }

  const updateComments = (comments) => {
    setValues({...values, comments: comments})
  }

  const deletePlace = () => {
    remove({
      placeId: props.place._id
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        props.onRemove(props.place)
      }
    })
  }

    return (
      <Card className={classes.card}>
        <CardHeader
            avatar={
              <Avatar src={'/api/users/photo/'+props.place.postedBy._id}/>
            }
            action={props.place.postedBy._id === auth.isAuthenticated().user._id &&
              <IconButton onClick={deletePlace}>
                <DeleteIcon/>
              </IconButton>
            }
            title={<Link to={"/user/" + props.place.postedBy._id}>{props.place.postedBy.name}</Link>}
            subheader={(new Date(props.place.created)).toDateString()}
            className={classes.cardHeader}
          />
        <CardContent className={classes.cardContent}>
          <Typography component="p" className={classes.text}>
            Name: {props.place.name}
          </Typography>
          <Typography component="p" className={classes.text}>
            Type: {props.place.isPrivate} {props.place.placeType}
          </Typography>
          <hr/>
          <Typography component="p" className={classes.text}>
            Address: {props.place.address}
          </Typography>
          <hr/>
          <Typography component="p" className={classes.text}>
            Description: {props.place.description}
          </Typography>
          {props.place.photo &&
            (<div className={classes.photo}>
              <img
                className={classes.media}
                src={'/api/places/photo/'+props.place._id}
                alt="Place Photo"
                />
            </div>)}
          {/*
          <hr/>
          <Typography component="p" className={classes.text}>
            PlaceID: {props.place._id}
          </Typography>
          */}
        </CardContent>
        <CardActions>
          { values.like
            ? <IconButton onClick={clickLike} className={classes.button} aria-label="Like" color="secondary">
                <FavoriteIcon />
              </IconButton>
            : <IconButton onClick={clickLike} className={classes.button} aria-label="Unlike" color="secondary">
                <FavoriteBorderIcon />
              </IconButton> } <span>{values.likes}</span>
              <IconButton className={classes.button} aria-label="Comment" color="secondary">
                <CommentIcon/>
              </IconButton> <span>{values.comments.length}</span>
        </CardActions>
        <Divider/>
        <Comments placeId={props.place._id} comments={values.comments} updateComments={updateComments}/>
      </Card>
    )

}

Place.propTypes = {
  place: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}
