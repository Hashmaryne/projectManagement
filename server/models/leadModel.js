import mongoose from 'mongoose';
const { Schema } = mongoose;


const leadSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  propertyCards: [{
    type: Schema.Types.ObjectId,
    ref: 'PropertyCard'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model('Lead', leadSchema);

