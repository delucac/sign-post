import mongoose from 'mongoose'
const PlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  address: {
    type: String,
    required: 'Address is required'
  },
  description: {
    type: String,
    required: 'description is required'
  },
  isPrivate: {
    type: String
  },
  placeType:{
    type: String
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
  }
})

export default mongoose.model('place', PlaceSchema)
