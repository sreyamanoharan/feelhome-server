import mongoose from 'mongoose';

const HostSchema = new mongoose.Schema({
  selectedCategory: {
    type: String,
  },
  selectedFeatures: {
    type: [], 
  },
  address: {
    type: Object,
  },
  selectedLocation: {
    type: [String], 
  },
  selectedPrice:{
    type:Number
  },
  images: {
    type: [String], 
  },
  selectedBasics: {
    type: Object,
  },
  hostId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  description:{
    type:String
  },
  isBooked:{
    type:Boolean,
    default:false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Host = mongoose.model('Host', HostSchema);

export default Host;
