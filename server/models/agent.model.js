import mongoose from 'mongoose'
const AgentSchema = new mongoose.Schema({
  UA: {
    type: String
  },
  Permission: {
    type: String,
    default : "User"
  },
  postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  created: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('agent', AgentSchema)
