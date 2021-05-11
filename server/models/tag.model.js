import mongoose from 'mongoose'
const TagSchema = new mongoose.Schema({
  Name: {
    type: String,
    unique: 'Tag already exists',
    required: 'Name is required'
  }
})

export default mongoose.model('Tag', TagSchema)
