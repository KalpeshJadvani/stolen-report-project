const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const port = 8484;
const { createDummyRecord } = require('./Utility/DummyInsert');
const { itSelftAssignCases } = require('./Utility/AssingCases');
// include routes
const routes = require('./routes/router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/stolen_report_db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.info('DB connected!');
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

server.listen(port, () => {
  console.log(`Server is runing on port http://localhost:${port}`);
  createDummyRecord(); // Create Dummy recored to see
  itSelftAssignCases(); // If any Need to restart service then itself check  from here and assing casses
});
