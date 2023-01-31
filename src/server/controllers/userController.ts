//@ts-nocheck

import { Pool } from 'pg';
// const db = require('../models/userModel.ts');
import {db} from '../models/sqlModel';
import { Request, Response, NextFunction, RequestHandler } from 'express';


export const userController = {
  createUser: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // request to create user
    const insertQuery = `INSERT INTO addTableHere (add, columns, here) VALUES (add, values, for, columns, here)`;
  
    db.query(insertQuery)
      .then(() => {
        console.log('successfully created user');
      })
      .catch((err: Error) => {
        next({
          log: `Error in userController.createUser. Details: ${err}`,
          message: { err: 'An error occurred in the userController.createUser' },
        });
      });
  }
}
