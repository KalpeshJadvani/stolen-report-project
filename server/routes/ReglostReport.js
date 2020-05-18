const User = require('../models/user');
const CasesReport = require('../models/casesreport');
const { itSelftAssignCases } = require('../Utility/AssingCases');
const {
  checkProperties,
  RESPONSE_TYPE_SUCCESS,
  httpStatus,
  ALL_FILED_REQUERD,
  DATABASE_PROBLEM,
} = require('../Utility/utility');

ReglostReport = (req, res, next) => {
  const { body } = req;
  if (checkProperties(body)) {
    User.create(body, function (error, user) {
      if (error) {
        let err;
        if (error.code === 11000) {
          err = new Error(
            `Dubliate record of this reg Number id : ${body.policeid} `
          );
          err.status = 409;
        } else {
          try {
            err = new Error(DATABASE_PROBLEM + ' ' + error.message);
          } catch (newError) {
            err = new Error(DATABASE_PROBLEM);
          }
          err.status = 500;
        }

        return next(err);
      } else {
        itSelftAssignCases(); // When ever new report comes Then it will check to assing that case
        return res.status(httpStatus.OK).send({
          type: RESPONSE_TYPE_SUCCESS,
          data: {
            userId: user._id,
          },
        });
      }
    });
  } else {
    const err = new Error(ALL_FILED_REQUERD);
    err.status = 400;
    return next(err);
  }
};

getReportList = (req, res, next) => {};

getActiveReportList = async (req, res, next) => {
  try {
    const casesActive = await CasesReport.find({})
      .populate('police_row')
      .populate('reg_row')
      .exec();

    const reportList = await User.find({}).exec();

    return res.status(httpStatus.OK).send({
      type: RESPONSE_TYPE_SUCCESS,
      data: { casesActive, reportList },
    });
  } catch (error) {
    let err;
    try {
      err = new Error(DATABASE_PROBLEM + ' ' + error.message);
    } catch (newErr) {
      err = new Error(DATABASE_PROBLEM);
    }
    return next(err);
  }
};

updateStatusOfCase = (req, res, next) => {
  const { body } = req;
  if (checkProperties(body)) {
    const { caseid, casestatus } = body;
    const myQuery = { caseid };
    const newValues = { $set: { casestatus } };
    CasesReport.updateOne(myQuery, newValues, function (error, caseData) {
      if (error) {
        let err;
        try {
          err = new Error(DATABASE_PROBLEM + ' ' + error.message);
        } catch (newError) {
          err = new Error(DATABASE_PROBLEM);
        }
        err.status = 500;
        return next(err);
      } else {
        itSelftAssignCases(); // When ever new report comes Then it will check to assing that case
        return res.status(httpStatus.OK).send({
          type: RESPONSE_TYPE_SUCCESS,
          data: caseData,
        });
      }
    });
  } else {
    const err = new Error(ALL_FILED_REQUERD);
    err.status = 400;
    return next(err);
  }
};
module.exports = {
  ReglostReport,
  getReportList,
  getActiveReportList,
  updateStatusOfCase,
};
