import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Customer'],
    required: true
  },
  leads: [{
    type: Schema.Types.ObjectId,
    ref: 'Lead'
  }]
});
export default mongoose.model('User', userSchema);;