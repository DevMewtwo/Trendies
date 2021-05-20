const { Pool } = require('pg');
const models = require('./models');

const connectionString = 'postgresql://localhost:5432/random7';

// Create a new pool here using the connection string above
const pool = new Pool({
  connectionString: connectionString,
  database: 'postgres'
});


// Test Connection to the Database
pool.connect()
// When sucessfully connecting to the database
.then((client, done) => {
  console.log('Database Sucessfully connected');

  // Query the database to see all tables currently in the database
  const allTables = `
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `;

  pool.query(allTables)
  // When all tables have been retrieved
  .then(result => {
    // List of all required tables to be in the database
    const requiredTables = {
      users: false
    };

    // Traverse through all tables found from the database
    result.rows.forEach(table => {
      const tableName = table.table_name;
      // Set them to true in the 'requiredTables' object if found in the database
      if (requiredTables[tableName]){
        requiredTables[tableName] = true;
      }
    })

    // Traverse through the list of 'requiredTables'
    for (let tableName in requiredTables){
      // Create them in the database when they do not already exist
      if (requiredTables[tableName] === false){
        // Attempt to create the table in the database
        pool.query(models[tableName])
        .then(result => console.log('Table Sucessfully created'))
        .catch(err => console.log(`Did not make the ${tableName} table because it already exists`));
      }
    }
  })
  // When there was an error retrieving all the tables from the database
  .catch(err => console.log('Error Querying all tables'));
})
// When there is an error connecting to the database
.catch(err => console.log('Error Connecting to the Database'));

// Export the pool which represents the connection to the database
module.exports = pool;