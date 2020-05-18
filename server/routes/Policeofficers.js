const PoliceofficersModel = require('../models/policeofficers');
const { itSelftAssignCases } = require('../Utility/AssingCases');
const {
  checkProperties,
  RESPONSE_TYPE_SUCCESS,
  httpStatus,
  ALL_FILED_REQUERD,
  DATABASE_PROBLEM,
} = require('../Utility/utility');

Policeofficers = (req, res, next) => {
  const { body } = req;
  if (checkProperties(body)) {
    PoliceofficersModel.create(body, function (error, policeData) {
      if (error) {
        let err;
        if (error.code === 11000) {
          err = new Error(
            `Dubliate record of this police id : ${body.policeid} `
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
        itSelftAssignCases(); // When ever new Officer comes Then it will check to assing that case
        return GetPoliceofficersList(req, res, next);
      }
    });
  } else {
    const err = new Error(ALL_FILED_REQUERD);
    err.status = 400;
    return next(err);
  }
};
UpdatePoliceoffcer = (req, res, next) => {
  const { body } = req;
  if (checkProperties(body)) {
    const { policeid, name, age } = body;
    const myQuery = { policeid };
    const newValues = { $set: { name, age } };
    PoliceofficersModel.updateOne(myQuery, newValues, function (
      error,
      policeData
    ) {
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
        return GetPoliceofficersList(req, res, next);
      }
    });
  } else {
    const err = new Error(ALL_FILED_REQUERD);
    err.status = 400;
    return next(err);
  }
};
GetPoliceofficersList = (req, res, next) => {
  PoliceofficersModel.find({}).exec(function (error, result) {
    if (error) {
      let err;
      try {
        err = new Error(DATABASE_PROBLEM + ' ' + error.message);
      } catch (newError) {
        err = new Error(DATABASE_PROBLEM);
      }
      return next(error);
    } else {
      if (result === null) {
        const err = new Error('Not authorized! Go back!');
        err.status = 400;
        return next(err);
      } else {
        return res.status(httpStatus.OK).send({
          type: RESPONSE_TYPE_SUCCESS,
          data: result,
        });
      }
    }
  });
};

module.exports = {
  Policeofficers,
  GetPoliceofficersList,
  UpdatePoliceoffcer,
};
