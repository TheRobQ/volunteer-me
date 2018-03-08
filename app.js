'use strict';
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || '3001'
const stat = () => console.log(`listening on ${port}`);
const routes = require('./server/routes')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors')

app.disable('x-powered-by')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'));
app.use(cors());
app.use(express.static('public'))
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found, yikes');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send({err});
  // res.render('error');
});


app.listen(port, stat)


module.exports = app;
