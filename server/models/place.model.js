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
  address:[{
    Number: [{type: Number, required: true}],
    Road: [{type: String, required: true}],
    Apartment: [{type: Number}],
    City: [{type: String, required: true}],
    State: [{type: String, required: true}],
    Zip: [{type: Number, required: true}]
  }],
  type: {
    type: String
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
