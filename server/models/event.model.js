import mongoose from 'mongoose'
const EventSchema = new mongoose.Schema({
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
  type: {
    type: String,
    default: "Private"
  },
  place: {
    type: mongoose.Schema.ObjectId, ref: 'Place'
  },
  Date: {
    type: Date
  },
  tags: [{type: mongoose.Schema.ObjectId, ref: 'Tag'}],
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  created: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Event', EventSchema)
