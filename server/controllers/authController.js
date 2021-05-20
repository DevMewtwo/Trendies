const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../model/db');

// Move this to a more secure location
const jwtSecret = 'superman';


const authController = {};


// Validate User Password and Username
authController.authenticateUser = (req, res, next) => {
  // Store the relevant sent data
  const { username, password } = req.body;
  
  // Validate the data sent through the request body
  if (!username || typeof username !== 'string' || !password || typeof password !== 'string' ){
    return next('Please Enter a Valid Password');
  }
  
  // Attempt to get the User from the Database, based on the given username
  const findUser = `
    SELECT user_name, password FROM users
    WHERE user_name = '${username}';
  `;
  
  db.query(findUser)
  // When a user was sucessfully found
  .then(user => {
    // User was Sucessfully found
    if (user.rowCount === 1){
      const passwordFromDatabase = user.rows[0].password;
        
      // Compare the password from the database to the password given
      bcrypt.compare(password, passwordFromDatabase)
      // When comparison was sucessful
      .then(passwordsMatch => {
  
        // Handle cases based on if the passwords match
        if (passwordsMatch){
          return next();
        }else{
          return next('Wrong Password please try again');
        }
      })
      // When an error occured comparing the passwords
      .catch(err => {
        return next('An Error has occured, Please try again later')
      });
  
      // User was not found sucessfully
      }else{
        return next('Wrong username please try again')
      }    
    })
    // When an error occurs querying the database
    .catch(err => {
      return next('Error Loggin in, please try again later');
    })
};


// Log the user in, by creating a JWT, which will be used for authorizing further actions when necessary
authController.logUserIn = (req, res, next) => {
  // Attempt to make a new JWT
  jwt.sign({welcome: 'welcome'}, jwtSecret, {expiresIn: '1d'}, (err, newToken) => {

    // When there was an error creating the JWT, do not allow them to sign in
    if (err){
      return next('Error signing in, please try again later');
    }

    // Set the JWT in the cookies
    res.cookie('JWT', newToken, {
      httpOnly: true
    });

    // Move to the next middleware function
    return next();
  })
}


module.exports = authController;