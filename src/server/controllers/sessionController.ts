// @ts-nocheck

import { Pool } from 'pg';
// const db = require('../models/userModel.ts');
import {db} from '../models/sqlModel';
import { Request, Response, NextFunction, RequestHandler } from 'express';



export const sessionController = {
  createSession: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // request to create user
    const insertQuery = `INSERT INTO addTableHere (add, columns, here) VALUES (add, values, for, columns, here)`;
  
    db.query(insertQuery)
      .then(() => {
        console.log('successfully created session');
      })
      .catch((err: Error) => {
        next({
          log: `Error in sessionController.createSession. Details: ${err}`,
          message: {
            err: 'An error occurred in the sessionController.createSession',
          },
        });
      });
  },
  findSession: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // request to create user
    const insertQuery = `SELECT `;
  
    db.query(insertQuery)
      .then(() => {
        console.log('successfully found session');
      })
      .catch((err: Error) => {
        next({
          log: `Error in sessionController.findSession. Details: ${err}`,
          message: {
            err: 'An error occurred in the sessionController.findSession',
          },
        });
      });
  },
  findSession: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // request to create user
    const insertQuery = `SELECT `;
  
    db.query(insertQuery)
      .then(() => {
        console.log('successfully found session');
      })
      .catch((err: Error) => {
        next({
          log: `Error in sessionController.findSession. Details: ${err}`,
          message: {
            err: 'An error occurred in the sessionController.findSession',
          },
        });
      });
  },
}