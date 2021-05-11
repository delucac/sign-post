import mongoose from 'mongoose'
const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  description: {
    type: String,
    required: 'description is required'
  },
  date: {
    type: Date
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  comments: [{
    text: String,
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
  }],
  postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  created: {
    type: Date,
    default: Date.now
  },
  place: {type: mongoose.Schema.ObjectId, red: 'Place'}
})

export default mongoose.model('event', EventSchema)