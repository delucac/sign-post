import Place from '../models/place.model'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'

const create = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }
    let place = new Place(fields)
    place.postedBy= req.profile
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
    let place = await Place.findById(id).populate('postedBy', '_id name').exec()
    if (!place)
      return res.status('400').json({
        error: "Place not found"
      })
    req.place = place
    next()
  }catch(err){
    return res.status('400').json({
      error: "Could not retrieve use place"
    })
  }
}

const listByUser = async (req, res) => {
  try{
    let places = await Place.find({postedBy: req.profile._id})
                          .populate('comments.postedBy', '_id name')
                          .populate('postedBy', '_id name')
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
    let places = await Place.find({postedBy: { $in : req.profile.following } })
                          .populate('comments.postedBy', '_id name')
                          .populate('postedBy', '_id name')
                          .sort('-created')
                          .exec()
    res.json(places)
  }catch(err){
    return res.status(400).json({
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

const comment = async (req, res) => {
  let comment = req.body.comment
  comment.postedBy = req.body.userId
  try{
    let result = await Place.findByIdAndUpdate(req.body.placeId, {$push: {comments: comment}}, {new: true})
                            .populate('comments.postedBy', '_id name')
                            .populate('postedBy', '_id name')
                            .exec()
    res.json(result)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
const uncomment = async (req, res) => {
  let comment = req.body.comment
  try{
    let result = await Place.findByIdAndUpdate(req.body.placeId, {$pull: {comments: {_id: comment._id}}}, {new: true})
                          .populate('comments.postedBy', '_id name')
                          .populate('postedBy', '_id name')
                          .exec()
    res.json(result)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isPoster = (req, res, next) => {
  let isPoster = req.place && req.auth && req.place.postedBy._id == req.auth._id
  if(!isPoster){
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
  comment,
  uncomment,
  isPoster
}
