const express = require ('express');
const router = express.Router();

var relayData = {pageName: "RELAY"};

//Handle our routes
router.get('/',function(req,res){
    res.render('index.ejs', relayData)
});

router.get('/about',function(req,res){
    res.render('about.ejs', relayData)
});

router.get('/communication',function(req,res){
    if (req.session.loggedin) {
        res.render('comm.ejs', relayData)
    } else {
        res.send('Please log for full access!')
    }
    
});

router.get('/login',function(req,res){
    res.render('login.ejs', relayData)
});


//Load page with user profile
router.post('/home',function(req,res){
    //Store inputted fields
    let email = req.body.Email;
    let password = req.body.Pword;

    //Make sure fields aren't empty
    if (email && password) {

        //Query the database for student email and password
        db.query('SELECT * FROM students WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {

            if (error) throw error;
            //If fields match the database -> log the user in and redirect back home page
            if(results.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;

                let userData = Object.assign({}, relayData, {userInfo:results});
                res.render('loggedin.ejs', userData);
            } else {
                res.send('Incorrect username or password');
            }
            res.end();
        });
    } else {
        res.send('Please enter email and password');
    }
});

//Export modules
module.exports = router;