// const { Pool } = require('pg');
import { Pool } from 'pg';

const PG_URI = 'INSERT URI HERE';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

// Schema for the database can be found below:
// https://github.com/CodesmithLLC/unit-10SB-databases/blob/master/docs/assets/images/schema.png

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
