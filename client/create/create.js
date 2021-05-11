import React, {useState, useEffect, Component} from 'react'
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
import {create} from '../place/api-place'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'

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

export default function NewPlace (props){
  const classes = useStyles()
  const [values, setValues] = useState({
    Name: '',
    photo: '',
    description: '',

    text: '',
    error: '',
    user: {}
  })
  const jwt = auth.isAuthenticated()
  useEffect(() => {
    setValues({...values, user: auth.isAuthenticated().user})
  }, [])
  const clickPlace = () => {
    let placeData = new FormData()
    placeData.append('Name', values.Name)
    placeData.append('photo', values.photo)
    placeData.append('description', values.description)
    placeData.append('addressNumber', values.address.Number)
    placeData.append('addressRoad', values.address.Road)
    placeData.append('addressApartment', values.address.Apartment)
    placeData.append('addressCity', values.address.City)
    placeData.append('addressState', values.address.State)
    placeData.append('addressZip', values.address.Zip)
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, placeData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, Name:'', photo: '', description:'', addressNumber:'', addressRoad:'',)
        props.addUpdate(data)
      }
    })
  }

  const handleChange = name => event => {
    const value = name === 'photo'
        ? event.target.files[0]
        : event.target.value
    setValues({...values, [Name]: value})
    setValues({...values, [description]: value})
    setValues({...values, [addressNumber]: value})
    setValues({...values, [addressRoad]: value})
    setValues({...values, [addressApartment]: value})
    setValues({...values, [addressCity]: value})
    setValues({...values, [addressState]: value})
    setValues({...values, [addressZip]: value})
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
            placeholder="Name"
            multiline
            rows="1"
            value={values.name}
            onChange={handleChange('name')}
            className={classes.textField}
            margin="normal"
        />
        <TextField
            placeholder="Description"
            multiline
            rows="3"
            value={values.description}
            onChange={handleChange('description')}
            className={classes.textField}
            margin="normal"
        />
        <TextField
            placeholder="Building #"
            multiline
            rows="1"
            value={values.addressNumber}
            onChange={handleChange('address.number')}
            className={classes.textField}
            margin="normal"
        />
        <TextField
            placeholder="Road"
            multiline
            number
            rows="1"
            value={values.addressRoad}
            onChange={handleChange('address.Road')}
            className={classes.textField}
            margin="normal"
        />
        <TextField
            placeholder="Apartment"
            multiline
            rows="1"
            value={values.addressApartment}
            onChange={handleChange('address.Apartment')}
            className={classes.textField}
            margin="normal"
        />
        <TextField
            placeholder="City"
            multiline
            rows="1"
            value={values.addressCity}
            onChange={handleChange('address.City')}
            className={classes.textField}
            margin="normal"
        />
        <TextField
            placeholder="State"
            multiline
            rows="1"
            value={values.addressState}
            onChange={handleChange('address.State')}
            className={classes.textField}
            margin="normal"
        />
        <TextField
            placeholder="Zip"
            multiline
            rows="1"
            value={values.addressZip}
            onChange={handleChange('address.Zip')}
            className={classes.textField}
            margin="normal"
        />
        <TextField
            placeholder="Apartment"
            multiline
            number
            rows="1"
            value={values.addressApartment}
            onChange={handleChange('address.Apartment')}
            className={classes.textField}
            margin="normal"
        />
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
        <Button color="primary" variant="contained" disabled={values.text === ''} onClick={clickPlace} className={classes.submit}>Create</Button>
      </CardActions>
    </Card>
  </div>)

}

NewPlace.propTypes = {
  addUpdate: PropTypes.func.isRequired
}