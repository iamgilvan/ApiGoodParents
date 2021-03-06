const express       = require('express');
const compression   = require('compression');
const bodyParser    = require('body-parser');
const logger        = require('morgan');
const errorHandler  = require('errorhandler');
const dotenv        = require('dotenv');
const mongoose      = require('mongoose');
const cors          = require('cors');
const path          = require('path');

dotenv.load({
    path: '.env'
})

const app           = express();
const server        = require("http").Server(app);

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

app.use(errorHandler());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(
  () => {
    console.log('Database connected successfully! ')
  },
  err => {
    console.error('Error connected DataBase: ', err)
    process.exit(1)
  }
)

require('./src/Routes/api.js')(app);

server.listen(app.get('port'), function () {
  console.log('\n-> Server running on port ' + app.get('port') + ' in ' + app.get('env') + ' mode ' + '\n')
})

module.exports = app;