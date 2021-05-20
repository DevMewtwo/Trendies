module.exports.users = `
 CREATE TABLE users (
   user_id SERIAL PRIMARY KEY,
   email_address VARCHAR(40) NOT NULL UNIQUE,
   user_name VARCHAR(20) NOT NULL UNIQUE,
   password VARCHAR(100) NOT NULL
 );
`;
