//Setup modules
var express = require ('express');
var ejs = require ('ejs');
var mysql = require ('mysql2');
const session = require ('express-session');

//Create express app object
var app = express();
const port = 8000;

//Set ejs as templating engine
app.set('view engine', 'ejs');

//Set up session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Body parser
app.use(express.urlencoded({ extended: true }));

//CSS
app.use(express.static(__dirname + '/public'));

//Client side javascript
app.use(express.static(__dirname + '/views'));

//Define database connection
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'relay_app',
    password: 'relay_password',
    database: 'RELAY'
});

//Connect to databse
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

//Route handlers
const mainRoutes = require("./routes/main");  
app.use('/', mainRoutes);

//Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))