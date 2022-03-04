const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8585;
const dbpass = "stolen_report123";
const dbusername = "stolen_report";
const { createDummyRecord } = require('./Utility/DummyInsert');
const { itSelftAssignCases } = require('./Utility/AssingCases');

app.use(cors());
// app.use(cors({ origin: '*', credentials: true }));
app.options('*', cors());
// include routes
const routes = require('./routes/router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require('mongoose');

const url = `mongodb+srv://${dbusername}:${dbpass}@cluster0.bn45c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams);

// this for local 
// mongoose.connect('mongodb://localhost:27017/stolen_report_db', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });

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
