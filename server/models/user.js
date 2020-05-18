const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  regNumber: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  carModel: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  comapanyName: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  colorOfCar: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
