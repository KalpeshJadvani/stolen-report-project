const PoliceofficersModel = require('../models/policeofficers');
const CasesReport = require('../models/casesreport');
const PrePoliceOfficerData = [
  {
    policeid: 101010,
    name: 'Hannah Michael',
    age: 45,
  },
  {
    policeid: 101011,
    name: 'Samantha Emily',
    age: 37,
  },
  // {
  //   policeid: 101012,
  //   name: 'Christopher Matthew',
  //   age: 42,
  // },
  // {
  //   policeid: 101013,
  //   name: 'Andrew Tyler',
  //   age: 30,
  // },
  // {
  //   policeid: 101014,
  //   name: 'Jessica Kimberly',
  //   age: 28,
  // },
];

insertRecord = (len) => {
  if (len > -1) {
    PoliceofficersModel.create(PrePoliceOfficerData[len], function (err, data) {
      insertRecord(len - 1);
    });
  }
};

createDummyRecord = () => {
  insertRecord(PrePoliceOfficerData.length - 1);
};

module.exports = {
  createDummyRecord,
};
