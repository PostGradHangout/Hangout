// @ts-nocheck
import { Pool } from 'pg';
// const db = require('../models/userModel.ts');
import {db} from '../models/sqlModel';
import { Request, Response, NextFunction, RequestHandler } from 'express';




export const cookieController = {
  findCookie: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // request to create user
    const insertQuery = `SELECT `;
  
    db.query(insertQuery)
      .then(() => {
        console.log('successfully found cookie');
      })
      .catch((err: Error) => {
        next({
          log: `Error in cookieController.findCookie. Details: ${err}`,
          message: {
            err: 'An error occurred in the cookieController.findCookie',
          },
        });
      });
  },
  createCookie: (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    // request to create user
    const insertQuery = `INSERT INTO addTableHere (add, columns, here) VALUES (add, values, for, columns, here)`;
  
    db.query(insertQuery)
      .then(() => {
        console.log('successfully created cookie');
      })
      .catch((err: Error) => {
        next({
          log: `Error in cookieController.createCookie. Details: ${err}`,
          message: {
            err: 'An error occurred in the cookieController.createCookie',
          },
        });
      });
  }
}
