import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const propertyCardSchema = new Schema({
  community: {
    type: String,
    enum: ['CommunityA', 'CommunityB'],
    required: true
  },
  building: {
    type: String,
    enum: ['BuildingA', 'BuildingB'],
    required: true
  },
  unitNo: {
    type: String,
    required: true
  },
}, {
  indexes: [
    { fields: { community: 1, building: 1, unitNo: 1 }, options: { unique: true } }
  ]
});

export default mongoose.model('PropertyCard', propertyCardSchema);;
