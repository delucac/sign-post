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
import {create} from './api-place.js'
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
    name: '',
    description: '',
    address: '',
    isPrivate: '',
    placeType: '',
    photo: '',
    error: '',
    user: {}
  })
  const jwt = auth.isAuthenticated()
  useEffect(() => {
    setValues({...values, user: auth.isAuthenticated().user})
  }, [])
  const clickPlace = () => {
    let placeData = new FormData()
    placeData.append('name', values.name)
    placeData.append('description', values.description)
    placeData.append('address', values.address)
    placeData.append('placeType', values.placeType)
    placeData.append('isPrivate', values.isPrivate)
    placeData.append('photo', values.photo)
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, placeData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, name:'', description:'', address:'', isPrivate:'', placeType:'', photo: ''})
        props.addUpdate(data)
      }
    })
  }
  const handleChange = name => place => {
    const value = name === 'photo'
      ? place.target.files[0]
      : place.target.value
    setValues({...values, [name]: value })
    setValues({...values, [description]: value })
    setValues({...values, [address]: value})
    setValues({...values, [isPrivate]: value})
    setValues({...values, [placeType]: value})
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
            placeholder="Name your place"
            multiline
            rows="1"
            value={values.name}
            onChange={handleChange('name')}
            className={classes.textField}
            margin="normal"
        />
        <TextField
            placeholder="Number Street, City, State Zip "
            multiline
            rows="3"
            value={values.address}
            onChange={handleChange('address')}
            className={classes.textField}
            margin="normal"
        />
        <TextField
            placeholder="Tell us about your place..."
            multiline
            rows="3"
            value={values.description}
            onChange={handleChange('description')}
            className={classes.textField}
            margin="normal"
        />
        <Typography component="p" className={classes.textField}>
          Type:
        </Typography>
        <select
            value={values.placeType}
            onChange={handleChange('placeType')}
            className={classes.textField}
        >
          <option value=""></option>
          <option value="Residence">Residence</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Park">Park</option>
          <option value="Beach">Beach</option>
          <option value="Other">Other</option>
        </select>
        <br/>
        <br/>
        <Typography component="p" className={classes.textField}>
          Non-Public/Public:
        </Typography>
        <select
            value={values.isPrivate}
            onChange={handleChange('isPrivate')}
            className={classes.textField}
        >
          <option value=""></option>
          <option value="Non-Public">Non-Public</option>
          <option value="Public">Public</option>
        </select>
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
        <Button color="primary" variant="contained" disabled={values.text === ''} onClick={clickPlace} className={classes.submit}>POST PLACE</Button>
      </CardActions>
    </Card>
  </div>)

}

NewPlace.propTypes = {
  addUpdate: PropTypes.func.isRequired
}

