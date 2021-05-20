const express = require('express');
const path = require('path');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
var cors = require('cors')

const app = express();
app.use(cors())

// Parse JSON body
app.use(express.json());


app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Serve the React Application on the homepage
app.get('/', (req, res) => {
  res.status(200).send('SEND THE REACT FILEEEEE')
});

// Create a new user account 
app.post('/signup', userController.createNewUser, authController.logUserIn, (req, res) => {
  res.status(200).send('Sucessfully created');
});

// Log a user in 
app.post('/login', authController.authenticateUser, authController.logUserIn, (req, res) => {
  res.status(200).send('Logged in Sucessfully');
});

// Global Error Handling
app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'fail',
    message: err
  })
});

app.listen(8080);