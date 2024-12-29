const express = require ('express');
const router = express.Router();

var relayData = {pageName: "RELAY"};
var userData ={};

//Handle our routes
router.get('/',function(req,res){
    res.render('index.ejs', relayData)
});

router.get('/about',function(req,res){
    res.render('about.ejs', relayData)
});

router.get('/login',function(req,res){
    res.render('studentLogin.ejs', relayData)
});

router.get('/staff-login',function(req,res){
    res.render('staffLogin.ejs', relayData)
})

//Load page with user profile
router.post('/home',function(req,res){
    //Store inputted fields
    let email = req.body.Email;
    let password = req.body.Pword;

    //Make sure fields aren't empty
    if (email && password) {

        //Query the database for student email and password
        const studentQuery = 'SELECT * FROM students WHERE email = ? AND password = ?';
        db.query(studentQuery, [email, password], function(error, results, fields) {

            if (error) throw error;
            //If fields match the database -> log the user in and redirect back home page
            if(results.length > 0) {
                req.session.studentLoggedin = true;
                req.session.email = email;

                //Create a new object for active student data to get sent to the app
                userData = Object.assign({}, relayData, {userInfo:results});
                res.render('studentLoggedin.ejs', userData);
            } else {
                //In case of invalid email | password
                res.status(401).json({ error: 'Incorrect username or password'})
            }
            res.end();
        });
    } else {
        //If fields are missing
        res.send('Please enter login credentials');
    }
});

//Load page with staff user profile
router.post('/staff-home',function(req,res){
    //Store inputted fields
    let email = req.body.Email;
    let password = req.body.Pword;

    //Make sure fields aren't empty
    if (email && password) {

        //Query the database for student email and password
        const staffQuery = 'SELECT * FROM staff WHERE email = ? AND password = ?';
        db.query(staffQuery, [email, password], function(error, results, fields) {

            if (error) throw error;
            //If fields match the database -> log the user in and redirect back home page
            if(results.length > 0) {
                req.session.staffLoggedin = true;
                req.session.email = email;

                //Create a new object for active student data to get sent to the app
                userData = Object.assign({}, relayData, {userInfo:results});
                res.render('staffLoggedin.ejs', userData);
            } else {
                //In case of invalid email | password
                res.status(401).json({ error: 'Incorrect username or password'})
            }
            res.end();
        });
    } else {
        //If fields are missing
        res.send('Please enter login credentials');
    }
});

//Handle routes if logged in

//for home button
router.get('/student-home',function(req,res){
    if (req.session.studentLoggedin) {
        res.render('studentLoggedin.ejs', userData)
    } else {
        res.send('Please log in for full access!')
    }
});

router.get('/staff-home',function(req,res){
    if (req.session.staffLoggedin) {
        res.render('staffLoggedin.ejs', userData)
    } else {
        res.send('Please log in for full access!')
    }
});

//for personalized communication boards
router.get('/student-communication',function(req,res){
    if (req.session.studentLoggedin) {
        res.render('studentComm.ejs', userData)
    } else {
        res.send('Please log in for full access!')
    }
});

router.get('/staff-communication',function(req,res){
    if (req.session.staffLoggedin) {
        res.render('staffComm.ejs', userData)
    } else {
        res.send('Please log in for full access!')
    }
});

//Export modules
module.exports = router;