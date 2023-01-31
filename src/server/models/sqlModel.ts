import { Pool } from 'pg';

const PG_URI =
  'postgres://fghwpsnc:we4jmChQS945HHBMNqROx70vYnjR7YHZ@baasu.db.elephantsql.com/fghwpsnc';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

// ===========================
// Table Build SQL Queries (schema):
// ===========================
