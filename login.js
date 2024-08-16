const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const encoder = bodyParser.urlencoded({ extended: true });
const app = express();

app.use("/assets", express.static("assets"));
app.use(encoder);
app.use(express.static(__dirname));

// Configure express-session middleware
app.use(session({
    secret: 'your_secret_key', // Replace with your own secret key for session encryption
    resave: true,
    saveUninitialized: true
}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'J.Aravind984867',
    database: 'eduplay'
});

connection.connect(function(error) {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log("Connected to the database successfully");
});

app.get("/", function(req, res) {
    // Check if user is already logged in
    if (req.session.loggedin) {
        res.redirect("/home.html"); // Redirect to home if already logged in
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
    connection.query("SELECT * FROM loginuser WHERE user_name = ? AND user_pass = ?", [username, password], function(error, results) {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length > 0) {
            req.session.loggedin = true; // Mark the user as logged in
            res.redirect("/home.html");
        } else {
            res.redirect("/");
        }
        res.end();
    });
});

// Middleware to protect routes
function requireLogin(req, res, next) {
    if (req.session.loggedin) {
        next(); // Continue to the requested route
    } else {
        res.redirect("/"); // Redirect to login if not logged in
    }
}

// Protected routes
app.get("/home.html", requireLogin, function(req, res) {
    res.sendFile(__dirname + "/home.html");
});

app.get("/videoplayer.html", requireLogin, function(req, res) {
    res.sendFile(path.join(__dirname, "videoplayer.html"));
});

app.get("/todolist.html", requireLogin, function(req, res) {
    res.sendFile(path.join(__dirname, "todolist.html"));
});

app.listen(4000, function() {
    console.log('Server is running on port 4000');
});
