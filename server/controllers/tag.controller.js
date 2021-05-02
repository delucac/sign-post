import Tag from '../models/tag.model.model'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from "fs";

const create = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }
    let tag = new Tag(fields)
    tag.Name = req.fields
    try {
      let result = await post.save()
      res.json(result)
    }catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const tagByID = async (req, res, next, id) => {
  try{
    let tag = await Tag.findById(id).exec()
    if (!tag)
      return res.status('400').json({
        error: "Tag not found"
      })
    req.tag = tag
    next()
  }catch(err){
    return res.status('400').json({
      error: "Could not retrieve use tag"
    })
  }
}

const remove = async (req, res) => {
  let tag = req.tag
  try{
    let deletedTag = await tag.remove()
    res.json(deletedTag)
  }catch(err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default {
  create,
  tagByID,
  remove
}
