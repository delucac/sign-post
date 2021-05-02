import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import Event from '../models/event.model'

const create = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }
    let event = new Event(fields)
    event.createdBy = req.profile
    if(files.photo){
      post.photo.data = fs.readFileSync(files.photo.path)
      post.photo.contentType = files.photo.type
    }
    try {
      let result = await event.save()
      res.json(result)
    }catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const eventByID = async (req, res, next, id) => {
  try{
    let event = await Event.findById(id).populate('createdBy', '_id name').exec()
    if (!event)
      return res.status('400').json({
        error: "Event not found"
      })
    req.event = event
    next()
  }catch(err){
    return res.status('400').json({
      error: "Could not retrieve use event"
    })
  }
}

const listByUser = async (req, res) => {
  try{
    let events = await Event.find({createdBy: req.profile._id})
                          .populate('comments.createdBy', '_id name')
                          .populate('createdBy', '_id name')
                          .sort('-created')
                          .exec()
    res.json(events)
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
    let events = await Event.find({createdBy: { $in : req.profile.following } })
                          .populate('comments.createdBy', '_id name')
                          .populate('createdBy', '_id name')
                          .sort('-created')
                          .exec()
    res.json(posts)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  let event = req.event
  try{
    let deletedEvent = await event.remove()
    res.json(deletedEvent)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.event.photo.contentType)
    return res.send(req.event.photo.data)
}

const like = async (req, res) => {
  try{
    let result = await Event.findByIdAndUpdate(req.event.eventId, {$push: {likes: req.body.userId}}, {new: true})
    res.json(result)
  }catch(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }
}

const unlike = async (req, res) => {
  try{
    let result = await Event.findByIdAndUpdate(req.event.eventId, {$pull: {likes: req.body.userId}}, {new: true})
    res.json(result)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const comment = async (req, res) => {
  let comment = req.body.comment
  comment.createdBy = req.body.userId
  try{
    let result = await Event.findByIdAndUpdate(req.body.eventId, {$push: {comments: comment}}, {new: true})
                            .populate('comments.createdBy', '_id name')
                            .populate('createdBy', '_id name')
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
    let result = await Event.findByIdAndUpdate(req.body.eventId, {$pull: {comments: {_id: comment._id}}}, {new: true})
                          .populate('comments.createdBy', '_id name')
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
  let isCreator = req.event && req.auth && req.post.createdBy._id == req.auth._id
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
  eventByID,
  remove,
  photo,
  like,
  unlike,
  comment,
  uncomment,
  isCreator
}
