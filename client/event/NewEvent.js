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
import {create} from './api-event.js'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TableDatePicker from "../DateManagement/DatePicker";

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
  const [Eventdate] = useState(new Date());
  const [values, setValues] = useState({
    name: '',
    description: '',
    date: '',
    photo: '',
    error: '',
    user: {}
  })
  const jwt = auth.isAuthenticated()
  useEffect(() => {
    setValues({...values, user: auth.isAuthenticated().user})
  }, [])
  const clickEvent = () => {
    let eventData = new FormData()
    eventData.append('name', values.name)
    eventData.append('description', values.description)
    eventData.append('date', values.date)
    eventData.append('photo', values.photo)
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, eventData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, name:'', description:'', date:'', photo: ''})
        props.addUpdate(data)
      }
    })
  }
  const handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    setValues({...values, [name]: value })
    setValues({...values, [description]: value })
    setValues({...values, [Eventdate]: value})
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
            placeholder="Name your event"
            multiline
            rows="1"
            value={values.name}
            onChange={handleChange('name')}
            className={classes.textField}
            margin="normal"
        />
        <TextField
            placeholder="Tell us about your event..."
            multiline
            rows="3"
            value={values.description}
            onChange={handleChange('description')}
            className={classes.textField}
            margin="normal"
        />
        Date of event:
        <TableDatePicker/>
        <br/>
        <input accept="image/*" onChange={handleChange('photo')} className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="secondary" className={classes.photoButton} component="span">
            <PhotoCamera />
          </IconButton>
        </label> <span className={classes.filename}>{values.photo ? values.photo.name : ''}</span>
        { values.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" disabled={values.text === ''} onClick={clickEvent} className={classes.submit}>POST EVENT</Button>
      </CardActions>
    </Card>
  </div>)

}

NewEvent.propTypes = {
  addUpdate: PropTypes.func.isRequired
}

