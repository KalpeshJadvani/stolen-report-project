const RESPONSE_TYPE_SUCCESS = 'success';
const RESPONSE_TYPE_ERROR = 'error';
const ALL_FILED_REQUERD = 'All fields required by value !';
const DATABASE_PROBLEM = 'Database Problem !';
const httpStatus = require('http-status');
function checkProperties(obj) {
  for (var key in obj) {
    if (obj[key] === null || obj[key] === '') return false;
  }
  return true;
}

module.exports = {
  checkProperties,
  RESPONSE_TYPE_SUCCESS,
  RESPONSE_TYPE_ERROR,
  httpStatus,
  ALL_FILED_REQUERD,
  DATABASE_PROBLEM,
};
