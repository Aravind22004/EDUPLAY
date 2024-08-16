const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'J.Aravind984867',
  database: 'eduplay',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const userData = {
    first_name: req.body['first-name'],
    father_name: req.body['father_name'],
    email: req.body.email,
    password: req.body['new-password'],
    gender: req.body.gender,
    class: req.body.referrer,
    age: req.body.age,
    bio: req.body.bio,
  };

  const sql = 'INSERT INTO users SET ?';
  db.query(sql, userData, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.send('Error occurred while submitting the form.');
      return;
    }
    console.log('Data inserted:', result);

    // Redirect to http://localhost:4000/home.html after successful form submission
    res.redirect('http://localhost:4000/home.html');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
