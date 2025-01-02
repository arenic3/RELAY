const express = require ('express');
const router = express.Router();

var relayData = {pageName: "RELAY"};
var userData = {};
recipientData = {};

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
        db.query(studentQuery, [email, password], (error, results) => {

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
        db.query(staffQuery, [email, password], (error, results) => {

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
            //Query to get teacher list
            const query = 'SELECT id, name, email FROM staff';
            db.query(query, (error, teachers) => {
                if (error) throw error;

                //Combing objects containing logged in user data and recipient list & send to page
                recipientData = Object.assign({}, recipientData, {teachers:teachers});
                const combinedData = Object.assign({}, userData, recipientData);
                res.render('studentComm.ejs', combinedData);
            })   
    } else {
        res.send('Please log in for full access!')
    }
});

router.get('/staff-communication',function(req,res){
    if (req.session.staffLoggedin) {
        //Query to get student list
        const query = 'SELECT id, name, email FROM students';
        db.query(query, (error, students) => {
            if (error) throw error;

            //Combing objects containing logged in user data and recipient list & send to page
            recipientData = Object.assign({}, recipientData, {students:students});
            const combinedData = Object.assign({}, userData, recipientData);
            res.render('staffComm.ejs', combinedData);
        })
    } else {
        res.send('Please log in for full access!')
    }
});

//Handle messaging (recieving message data through the form and sending it)
router.post('/student-communication',function(req,res){

    const { studentId, teacherId, message } = req.body;

    const query = 'INSERT INTO messages (student_id, teacher_id, message, timestamp) VALUES (?, ?, ?, NOW())';
    db.query(query, [studentId, teacherId, message], (error, results) => {
        if (error) throw error;
        res.send('message sent successfully');
    });
});

//Get messages
router.get('student-messages',function(req,res){
    if(!req.session.studenLoggedin) {
        return res.send('Please log in for full access!')
    }

    const { userId1, userId2 } = req.params;

    const query = `
    SELECT * FROM messages
    WHERE (student_id = ? AND teacher_id = ?)
    OR (student_id = ? AND teacher_id = ?)
    ORDER BY timestamp ASC
    `;
    db.query(query, [userId1, userId2, userId2, userId1], function(error, results) {
        if (error) throw error;
        res.json(results);
    });
});

//Export modules
module.exports = router;