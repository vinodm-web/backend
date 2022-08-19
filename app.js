const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const IndexRouter = require('./src/routes/index.route')
const app = express();

app.use(cors({ origin: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/index', IndexRouter, function (req, res, next) {
  next()
})

app.listen(3000, function () {
  console.log('listening on 3000')
})

app.get('/', function (req, res) {
  res.send('Hello World')
})
