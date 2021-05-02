import mongoose from 'mongoose'
const PlaceSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: 'Name is required'
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    required: 'Address is required'
  },
  type: {
    type: String,
    default: "Private"
  },
  likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  tags: [{type: mongoose.Schema.ObjectId, ref: 'Tag'}],
  reviews: [{
    text: String,
    created: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
  }],
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  created: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Place', PlaceSchema)
