const express = require('express');
const router = express.Router();
const {
  ReglostReport,
  getReportList,
  getActiveReportList,
  updateStatusOfCase,
} = require('./ReglostReport');
const {
  Policeofficers,
  GetPoliceofficersList,
  UpdatePoliceoffcer,
} = require('./Policeofficers');
// GET route for get Report List
router.get('/', getActiveReportList);
router.get('/report_list', getReportList);

//PUT route for updating status of case
router.put('/update_status', updateStatusOfCase);

//POST route for reg lost report data
router.post('/reg_lost_report', ReglostReport);

//POST route for add police officer data
router.post('/add_policeofficers', Policeofficers);

//PUT route for updating police officer data
router.put('/update_policeofficers', UpdatePoliceoffcer);

//GET route for get List of police officeres
router.get('/get_policeofficerslist', GetPoliceofficersList);

module.exports = router;
