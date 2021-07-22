import Agent from '../models/agent.model'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'

const create = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields) => {
    let agent = new Agent(fields)
    agent.postedBy= req.profile
    try {
      let result = await agent.save()
      res.json(result)
    }catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const agentByID = async (req, res, next, id) => {
  try{
    let agent = await Agent.findById(id).populate('postedBy', '_id name').exec()
    if (!agent)
      return res.status('400').json({
        error: "Agent not found"
      })
    req.agent = agent
    next()
  }catch(err){
    return res.status('400').json({
      error: "Could not retrieve use agent"
    })
  }
}

const listByUser = async (req, res) => {
  try{
    let agents = await Agent.find({postedBy: req.profile._id})
                          .populate('comments.postedBy', '_id name')
                          .populate('postedBy', '_id name')
                          .sort('-created')
                          .exec()
    res.json(agents)
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
    let agents = await Agent.find({postedBy: { $in : req.profile.following } })
                          .populate('comments.postedBy', '_id name')
                          .populate('postedBy', '_id name')
                          .sort('-created')
                          .exec()
    res.json(agents)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  let agent = req.agent
  try{
    let deletedAgent = await agent.remove()
    res.json(deletedAgent)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.agent.photo.contentType)
    return res.send(req.agent.photo.data)
}

const like = async (req, res) => {
  try{
    let result = await Agent.findByIdAndUpdate(req.body.agentId, {$push: {likes: req.body.userId}}, {new: true})
    res.json(result)
  }catch(err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
  }
}

const unlike = async (req, res) => {
  try{
    let result = await Agent.findByIdAndUpdate(req.body.agentId, {$pull: {likes: req.body.userId}}, {new: true})
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
    let result = await Agent.findByIdAndUpdate(req.body.agentId, {$push: {comments: comment}}, {new: true})
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
    let result = await Agent.findByIdAndUpdate(req.body.agentId, {$pull: {comments: {_id: comment._id}}}, {new: true})
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
  let isPoster = req.agent && req.auth && req.agent.postedBy._id == req.auth._id
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
  agentByID,
  remove,
  photo,
  like,
  unlike,
  comment,
  uncomment,
  isPoster
}
