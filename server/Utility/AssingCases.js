const CasesReport = require('../models/casesreport');
const PoliceofficersModel = require('../models/policeofficers');
const User = require('../models/user');
// is checking officer available then retrun true
async function isOfficerAvailable(officerData) {
  const isOnRecord = await CasesReport.find({
    police_row: officerData._id,
  }).exec();
  if (isOnRecord.length === 0 || isOnRecord[0].casestatus === 3) return true;
}

// checking over here,  report is yet not Assign by _id ;
async function caseIsNotAssign(reportData) {
  const isOnRecord = await CasesReport.find({
    reg_row: reportData._id,
  }).exec();
  if (isOnRecord.length > 0) {
    return false;
  } else {
    return true;
  }
}

// Return Last Index + 1 of caseid Filed from  CasesReport Table to incerment next case
async function getLatsIndexOfCaseId() {
  const LatsIndex = await CasesReport.findOne({}, {}, { sort: { caseid: -1 } });
  if (LatsIndex === null || LatsIndex.length === 0) {
    return 1;
  }
  return LatsIndex.caseid + 1;
}

// Create casee with mapping both IDs including new caseid
// casestatus is by defult 1 ,  1 = pending , 2 = inProgress, 3 = completed
// These are all flags to maitaing status of case
async function assignCaseToOfficer(officerData, caseData) {
  const body = {
    caseid: await getLatsIndexOfCaseId(),
    police_row: officerData._id,
    reg_row: caseData._id,
    casestatus: 1,
  };
  const createdRecord = await CasesReport.create(body);
  return createdRecord.length !== 0;
}

async function getBothList() {
  const Officers = await PoliceofficersModel.find({}).exec();
  const Reportes = await User.find({}).exec();

  for (let police_no = 0; police_no < Officers.length; police_no++) {
    if (await isOfficerAvailable(Officers[police_no])) {
      for (let report_no = 0; report_no < Reportes.length; report_no++) {
        if (await caseIsNotAssign(Reportes[report_no])) {
          if (await isOfficerAvailable(Officers[police_no])) {
            // agian check for officer
            const caseAssign = await assignCaseToOfficer(
              Officers[police_no],
              Reportes[report_no]
            );
          }
        }
      }
    }
  }
}

itSelftAssignCases = () => {
  getBothList();
};

module.exports = {
  itSelftAssignCases,
};
