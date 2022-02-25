const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      
      cors = require('cors');
      
const https = require('https');
const fs = require('file-system');


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
app.use('/event', express.static(__dirname + '/public/uploads/event'));
app.use('/story', express.static(__dirname + '/public/uploads/story'));

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
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

// app.use('/test', (req,res) => {
//   res.send("Working fine")
// })

const port = process.env.PORT;

const test = require('./api/routes/test');
app.use('/', test);

const user = require('./api/routes/user');
app.use('/user', user);

const feed = require('./api/routes/feed');
app.use('/feed', feed);

const forum = require('./api/routes/forum'); 
app.use('/forum', forum);

const event = require('./api/routes/event'); 
app.use('/event', event);

const story = require('./api/routes/story'); 
app.use('/story', story);

/** Create Server configuration */
if (process.env.NODE_ENV === 'PRODUCTION') {
    var credentials = {
      key: fs.readFileSync('/etc/letsencrypt/live/nodeserver.mydevfactory.com/privkey.pem', 'utf8'),
      cert: fs.readFileSync('/etc/letsencrypt/live/nodeserver.mydevfactory.com/fullchain.pem', 'utf8')
    };
    var server = https.createServer(credentials, app);
} else {
// var baseURL = 'http://localhost:1445/';
var server = require('http').createServer(app);
}

  // /** start listing the port */
server.listen(port, () => {
    console.log(`Server started at ${port}`)
});

// const port = process.env.PORT;
// app.listen(port, () => console.log(`Server started at ${process.env.baseURL}`));