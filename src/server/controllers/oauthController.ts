// @ts-nocheck

import { Pool } from 'pg';
// const db = require('../models/userModel.ts');
import {db} from '../models/sqlModel';




export const oauthController = {

//=============================
// oAuth Set Token
//=============================

  setToken:  (req, res, next) => {
    console.log('storeToken fired');
      const body = {client_id: clientId, client_secret: clientSecret, code: req.query.code}
  fetch(`https://github.com/login/oauth/access_token`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
      .then(() => {
        console.log('successfully created user');
        console.log(`data: ${data}`);
        return next();
      })
     .catch((err) => {
      next({
        log: `Error in oauthController.setToken. Details: ${err}`,
        message: { err: 'An error occurred in the oauthController.setToken' },
      });
    })
    
  },
  redirect: (req, res, next) => {
    console.log('redirect fired');
    return next();
    if (err) {((err) => {
      return next({
        log: `Error in oauthController.setToken. Details: ${err}`,
        message: { err: 'An error occurred in the oauthController.setToken' },
      });
    })
  }
  },
};