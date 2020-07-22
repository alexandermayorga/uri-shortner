const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');

const indexRouter = require('./routes/index');

const app = express();

//DB Config
// mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true, useUnifiedTopology: true
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
}));

app.set('view engine', 'hbs');


app.use('/', indexRouter);

module.exports = app;
