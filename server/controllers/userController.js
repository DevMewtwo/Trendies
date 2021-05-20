const db = require('../model/db');
const bcrypt = require('bcrypt');

// Move this data to a more secure location
const salt = 'superSecret';
const saltRounds = 10;


const userController = {};


// Create a new Account
userController.createNewUser = (req, res, next) => {
  // Store the relevant sent data
  const { username, password, emailaddress } = req.body;

  // Validate the data sent through the request body
  if (!username || typeof username !== 'string' 
    || !password || typeof password !== 'string'
    || ! emailaddress || typeof emailaddress !== 'string' ){
    return next('Please Enter a Valid Password');
  }

  // Attempt to Hash the given password
  bcrypt.genSalt(saltRounds, function(err, salt) {
    // When there was an error generating a salt
    if (err){
      return next('Account could not be created at this time');
    }

    bcrypt.hash(password, salt, function(err, hash) {
      // When there was an error hashing
      if (err){
        return next('Account could not be created at this time');
      }

      // Attempt to create the new user in the database
      const createNewUser = `
        INSERT INTO users(email_address, user_name, password)
        VALUES ('${emailaddress}', '${username}', '${hash}');
      `;

      db.query(createNewUser)
      // When Sucessfully created move to the next middleware function
      .then(result => next())
      // When Unsucessfully created, throw an error
      .catch(errObject => {
        if (errObject.code === '23505'){
          next('username or email is already taken, please try another')
        }else {
          next('Error occured when trying to make an account please try again');
        }
      })
    });
  });
};

module.exports = userController;