import React, {useState} from 'react'
import auth from './../auth/auth-helper'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import {review, unreview} from './api-place.js'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  smallAvatar: {
    width: 25,
    height: 25
  },
  reviewField: {
    width: '96%'
  },
  reviewText: {
    backgroundColor: 'white',
    padding: theme.spacing(1),
    margin: `2px ${theme.spacing(2)}px 2px 2px`
  },
  reviewDate: {
    display: 'block',
    color: 'gray',
    fontSize: '0.8em'
 },
 reviewDelete: {
   fontSize: '1.6em',
   verticalAlign: 'middle',
   cursor: 'pointer'
 }
}))

export default function Reviews (props) {
  const classes = useStyles()
  const [text, setText] = useState('')
  const jwt = auth.isAuthenticated()
  const handleChange = event => {
    setText(event.target.value)
  }
  const addReview = (event) => {
    if(event.keyCode == 13 && event.target.value){
      event.preventDefault()
      review({
        userId: jwt.user._id
      }, {
        t: jwt.token
      }, props.placeId, {text: text}).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setText('')
          props.updateReviews(data.reviews)
        }
      })
    }
  }

  const deleteReview = review => event => {
    unreview({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, props.placeId, review).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        props.updateReviews(data.reviews)
      }
    })
  }

    const reviewBody = item => {
      return (
        <p className={classes.reviewText}>
          <Link to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link><br/>
          {item.text}
          <span className={classes.reviewDate}>
            {(new Date(item.created)).toDateString()} |
            {auth.isAuthenticated().user._id === item.postedBy._id &&
              <Icon onClick={deleteReview(item)} className={classes.reviewDelete}>delete</Icon> }
          </span>
        </p>
      )
    }

    return (<div>
        <CardHeader
              avatar={
                <Avatar className={classes.smallAvatar} src={'/api/users/photo/'+auth.isAuthenticated().user._id}/>
              }
              title={ <TextField
                onKeyDown={addReview}
                multiline
                value={text}
                onChange={handleChange}
                placeholder="Write something ..."
                className={classes.reviewField}
                margin="normal"
                />}
              className={classes.cardHeader}
        />
        { props.reviews.map((item, i) => {
            return <CardHeader
                      avatar={
                        <Avatar className={classes.smallAvatar} src={'/api/users/photo/'+item.postedBy._id}/>
                      }
                      title={reviewBody(item)}
                      className={classes.cardHeader}
                      key={i}/>
              })
        }
    </div>)
}

Reviews.propTypes = {
  postId: PropTypes.string.isRequired,
  reviews: PropTypes.array.isRequired,
  updateReviews: PropTypes.func.isRequired
}
