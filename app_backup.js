const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      cors = require('cors');



//DATABASE CONNECTION
require('./api/dbs/dbConnection');

// .env configration
require('dotenv/config');

//To serve images, CSS files, and JavaScript or any static files in a directory named public:
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/image', express.static(__dirname + '/public/image'));

global.root_dir = __dirname;
app.use('/docs', express.static(__dirname + '/public/uploads/docs/'));
app.use('/user', express.static(__dirname + '/public/uploads/user/'));

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(cors());
mongoose.Promise = global.Promise;

// TO USE LOCAL DEFAULT USER
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

const test = require('./api/routes/test');
app.use('/', test);


const user = require('./api/routes/user');
app.use('/user', user);



const port = process.env.PORT;
app.listen(port, () => console.log(`Server started at ${process.env.baseURL}`));