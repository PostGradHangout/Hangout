//@ts-nocheck

import { Pool } from 'pg';

const PG_URI =
  'postgres://fghwpsnc:we4jmChQS945HHBMNqROx70vYnjR7YHZ@baasu.db.elephantsql.com/fghwpsnc';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

// module.exports = {
//   query: (text, params, callback) => {
//     console.log('executed query', text);
//     return pool.query(text, params, callback);
//   },
// };

export const db = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

// ===========================
// Table Build - SQL Queries (schema):
// ===========================

// CREATE TABLE hangout (
//   gitId INT NOT NULL,
//   gitUsername VARCHAR(100) NOT NULL,
//   gitAvatar TEXT,
//   currSession VARCHAR(255) NOT NULL
// );

// ===========================
// SQL Queries: Hangout - add new user with session
// ===========================

// const queryName = {
//   text: 'INSERT INTO hangout (gitId, gitUsername, gitAvatar, currSession) VALUES ($1, $2, $3, $4)',
//   values: [
//     req.body.gitId,
//     req.body.gitUsername,
//     req.body.gitAvatar,
//     req.body.currSession,
//   ],
// };
// db.query(queryName.text, queryName.values);

// ===========================
// SQL Queries: Hangout - update existing users old session
// ===========================

// const queryName = {
//   text: 'UPDATE hangout SET currSession = VALUES ($1) WHERE gitId = VALUES ($2)',
//   values: [
//     req.body.newSession,
//     req.body.gitId],
// };
// db.query(queryName.text, queryName.values);

// ===========================
// SQL Queries: Hangout - does the user exist by gitId - returns a boolean
// ===========================

// const queryName = {
//   text: 'EXISTS(SELECT * FROM hangout WHERE VALUES ($1))'
//   values: [
//     req.body.gitId],
// };
// db.query(queryName.text, queryName.values);

// ===========================
// SQL Queries: Hangout - pull all user info by session
// ===========================

// const queryName = {
//   text: 'SELECT * FROM hangout WHERE currSession = VALUES ($1)',
//   values: [
//     req.body.currSession,]
// };
// db.query(queryName.text, queryName.values);
