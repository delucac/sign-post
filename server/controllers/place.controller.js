import Place from '../models/place.model'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'

const create = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) =>{
    if (err){
      return rest.status(400).json({
        error:"Image could not be uploaded"
      })
    }
    let place = new Place(fields)
    place.createdBy = req.profile
    if(files.photo){
      place.photo.data = fs.readFileSync(files.photo.path)
      place.photo.contentType = files.photo.type
    }
      try {
        let result = await place.save()
        res.json(result)
      }catch (err){
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
  })
}

const placeByID = async (req, res, next, id) => {
  try{
    let place = await Place.findByID(id).populate('createdBy','_id name').exec()
    if(!place)
      return rest.status('400').json({
        error: "Place not found"
      })
    req.place = place
    next()
  }catch(err){
    return res.status('400').json({
      error: "Could not retrieve place"
    })
  }
}

const listByUser = async (req, res) => {
  try{
    let places = await place.find({createdBy: req.profile._id})
                            .sort('-created')
                            .exec()
    res.json(places)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listNewsFeed = async (req, res) => {
  let following = req.profile.following
  following.push(req.profile._id)
  try{
    let places = await Place.find({createdBy: { $in : req.profile.following} })
                            .sort('-created')
                            .exec()
    res.json(places)
  }catch(err){
    return rest.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  let place = req.place
  try{
    let deletedPlace = await place.remove()
    res.json(deletedPlace)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.place.photo.contentType)
    return res.send(req.place.photo.data)
}

const like = async (req, res) => {
  try{
    let result = await Place.findByIdAndUpdate(req.body.placeId, {$push: {likes: req.body.userId}}, {new: true})
    res.json(result)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const unlike = async (req, res) => {
  try{
    let result = await Place.findByIdAndUpdate(req.body.placeId, {$pull: {likes: req.body.userId}}, {new: true})
    res.json(result)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const review = async (req, res) => {
  let review = req.body.review
  review.createdBy = req.body.userId
  try{
    let result = await Place.findByIdAndUpdate(req.body.placeId, {$push: {reviews: review}}, {new: true})
                            .populate('reviews.createdBy', '_id name')
                            .populate('createdBy','_id name')
                            .exec()
    res.json (result)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const unreview = async (req, res) => {
  let review = req.body.review
  try{
    let result = await Place.findByIdAndUpdate(req.body.placeId, {$pull: {reviews: {_id: review._id}}}, {new: true})
                          .populate('reviews.createdBy', '_id name')
                          .populate('createdBy', '_id name')
                          .exec()
    res.json(result)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isCreator = (req, res, next) => {
  let isCreator = req.place && req.auth && req.place.createdBy._id == req.auth._id
  if(!isCreator){
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  listByUser,
  listNewsFeed,
  create,
  placeByID,
  remove,
  photo,
  like,
  unlike,
  review,
  unreview,
  isCreator
}
