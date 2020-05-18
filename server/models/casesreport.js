const mongoose = require('mongoose');
const CasesReportSchema = new mongoose.Schema({
  caseid: {
    type: Number,
    unique: true,
    required: true,
    trim: true,
  },
  police_row: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Policeofficers',
  },
  reg_row: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  casestatus: {
    type: Number,
    required: true,
  },
  // policename: {
  //   type: String,
  //   required: true,
  // },
  // username: {
  //   type: String,
  //   required: true,
  // },
});
const CasesReport = mongoose.model('CasesReport', CasesReportSchema);
module.exports = CasesReport;
