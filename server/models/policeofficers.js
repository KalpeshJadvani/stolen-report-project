const mongoose = require('mongoose');
const PoliceDataSchema = new mongoose.Schema({
  policeid: {
    type: Number,
    unique: true,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});
const Policeofficers = mongoose.model('Policeofficers', PoliceDataSchema);
module.exports = Policeofficers;
