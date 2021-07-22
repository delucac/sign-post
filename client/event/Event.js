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
import {remove, like, unlike} from './api-event.js'
import Comments from './Comments'
import {DeleteForever} from "@material-ui/icons"
import moment from 'moment'

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

export default function Event (props){
  const classes = useStyles()
  const jwt = auth.isAuthenticated()
  const checkLike = (likes) => {
    let match = likes.indexOf(jwt.user._id) !== -1
    return match
  }
  const [values, setValues] = useState({
    like: checkLike(props.event.likes),
    likes: props.event.likes.length,
    comments: props.event.comments
  })


  // useEffect(() => {
  //   setValues({...values, like:checkLike(props.event.likes), likes: props.event.likes.length, comments: props.event.comments})
  // }, [])



  const clickLike = () => {
    let callApi = values.like ? unlike : like
    callApi({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, props.event._id).then((data) => {
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

  const deleteEvent = () => {
    remove({
      eventId: props.event._id
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        props.onRemove(props.event)
      }
    })
  }

    return (
      <Card className={classes.card}>
        <CardHeader
            avatar={
              <Avatar src={'/api/users/photo/'+props.event.postedBy._id}/>
            }
            //Attempt at implementing admin delete
            /*
            action={"Admin" === auth.isAuthenticated().account_type &&
            <IconButton onClick={deleteEvent}>
              <DeleteForever/>
            </IconButton>
            }
            */
            action={props.event.postedBy._id === auth.isAuthenticated().user._id &&
              <IconButton onClick={deleteEvent}>
                <DeleteIcon/>
              </IconButton>
            }
            title={<Link to={"/user/" + props.event.postedBy._id}>{props.event.postedBy.name}</Link>}
            subheader={(new Date(props.event.created)).toDateString()}
            className={classes.cardHeader}
          />
        <CardContent className={classes.cardContent}>
          <Typography component="p" className={classes.text}>
            Name: {props.event.name}
            <br/>
            Date/Time: {moment(props.event.date).format('LLLL')}
            {/*
            <br/>
            Location: {props.event.place}
            */}
          </Typography>
          <hr/>
          <Typography component="p" className={classes.text}>
            Description: {props.event.description}
          </Typography>
          {props.event.photo &&
            (<div className={classes.photo}>
              <img
                className={classes.media}
                src={'/api/events/photo/'+props.event._id}
                alt="Event Photo"
                />
            </div>)}
          {/*
          <hr/>
          <Typography component="p" className={classes.text}>
            EventID: {props.event._id}
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
        <Comments eventId={props.event._id} comments={values.comments} updateComments={updateComments}/>
      </Card>
    )

}

Event.propTypes = {
  event: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}
