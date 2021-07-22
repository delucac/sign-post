import React, {useState, useEffect} from 'react'
import auth from './../auth/auth-helper'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
//import {create} from '../event/api-event'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import {create} from './api-agent'
import {getUA} from "react-device-detect"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#efefef',
    padding: `${theme.spacing(3)}px 0px 1px`
  },
  card: {
    maxWidth:600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(65, 150, 136, 0.09)',
    boxShadow: 'none'
  },
  cardContent: {
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '90%'
  },
  submit: {
    margin: theme.spacing(2)
  },
  filename:{
    verticalAlign: 'super'
  }
}))

export default function NewEvent (props){
  const classes = useStyles()
  const [values, setValues] = useState({
    UA: {getUA},
    Permission: 'User',
    user: {}
  })
  const jwt = auth.isAuthenticated()
  useEffect(() => {
    setValues({...values, user: auth.isAuthenticated().user})
  }, [])
  const clickAgent = () => {
    let eventData = new FormData()
    eventData.append('UA', {getUA})
    eventData.append('Permission', values.Permission)
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, eventData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, UA:{getUA}, Permission:'User'})
        props.addUpdate(data)
        console.log("Done")
      }
    })
  }

  const photoURL = values.user._id ?'/api/users/photo/'+ values.user._id : '/api/users/defaultphoto'
  return (<div className={classes.root}>
    <Card className={classes.card}>
      <CardHeader
          avatar={
            <Avatar src={photoURL}/>
          }
          title={values.user.name}
          className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <TextField
            value={getUA}
            multiline
            className={classes.textField}
            readOnly={true}
        />
        <TextField
            value={"User"}
            multiline
            className={classes.textField}
            readOnly={true}
        />
        { values.error && (<Typography component="p" color="error">
          <Icon color="error" className={classes.error}>error</Icon>
          {values.error}
        </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" disabled={values.text === ''} onClick={clickAgent} className={classes.submit}>Upload User Agent</Button>
      </CardActions>
    </Card>
  </div>)

}

NewEvent.propTypes = {
  addUpdate: PropTypes.func.isRequired
}

