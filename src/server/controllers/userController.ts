import { Pool } from 'pg';
// const db = require('../models/userModel.ts');
import db from '../models/userModel';

const userController = {};

userController.createUser =  (req, res, next) => {
  
    // request to create user
    const insertQuery = `INSERT INTO addTableHere (add, columns, here) VALUES (add, values, for, columns, here)`;

    db.query(insertQuery)
    .then(() => {
      console.log('successfully created user')
    })
   .catch(err) => {
    next({
      log: `Error in userController.createUser. Details: ${err}`,
      message: { err: 'An error occurred in the userController.createUser' },
    });
  }
  
};
