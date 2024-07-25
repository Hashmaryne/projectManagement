import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    enum: ['Admin', 'Customer'],
    required: true
  }
});

export default mongoose.model('Role', roleSchema);;