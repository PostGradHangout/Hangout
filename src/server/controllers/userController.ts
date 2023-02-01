// @ts-nocheck
import { Pool } from 'pg';
// const db = require('../models/userModel.ts');
import { db } from '../models/sqlModel';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export const userController = {
  findUser: async (req: Request, res: Response, next: NextFunction) => {
    const { ssid } = req.cookies;
    try {
      // query db for user with CurrSession with ssid
      const findBySession = {
        text: 'SELECT (gitUsername, gitAvatar) FROM hangout WHERE currSession = VALUES ($1)',
        values: [ssid],
      };
      const userInfo = db.query(findBySession.text, findBySession.values);
      // res.locals.userInfo assigned object with username and avatar url
      res.locals.userInfo = userInfo;
      res.cookie('ssid', ssidCookie, {
        httpOnly: true,
      });
      return next();
    } catch (err) {
      return next({
        log: `Error in userController.findUser. Details: ${err}`,
        message: { err: 'An error occurred in userController.findUser' },
      });
    }
  },
  createCookie: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      // check db for user, if so update CurrSession
      const { login, id, avatar_url } = res.locals.userInfo;
      console.log('type of id ', typeof id);
      const date = new Date();
      const ssidCookie = `${Date.parse(date)}${id}`;

      const doesExist = await db.query(
        `SELECT * FROM hangout WHERE gitId = ${id}`
      );
      console.log('doesExist: ', doesExist);
      if (doesExist.rowCount === 0) {
        // const createUser = {
        //   text: 'INSERT INTO hangout (gitId, gitUsername, gitAvatar, currSession) WHERE VALUES ($1, $2, $3, $4)',
        //   values: [id, login, avatar_url, ssidCookie],
        // };
        // db.query(createUser.text, createUser.values);
        db.query(
          `INSERT INTO hangout (gitId, gitUsername, gitAvatar, currSession) VALUES (${id}, '${login}', '${avatar_url.slice(
            8
          )}', ${ssidCookie})`
        );
      } else {
        // const updateSession = {
        //   text: 'UPDATE hangout SET currSession = VALUES ($1) WHERE gitId = VALUES ($2)',
        //   values: [ssidCookie, id],
        // };
        // db.query(updateSession.text, updateSession.values);
        db.query(
          `UPDATE hangout SET currSession = ${ssidCookie} WHERE gitId = ${id}`
        );
      }
      res.cookie('ssid', ssidCookie, {
        httpOnly: true,
      });

      return next();
    } catch (err) {
      return next({
        log: `Error in cookieController.createCookie. Details: ${err}`,
        message: { err: 'An error occurred in cookieController.createCookie' },
      });
    }
  },
};
