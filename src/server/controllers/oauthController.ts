// @ts-nocheck

import { response } from 'express';
import { Pool } from 'pg';
// const db = require('../models/userModel.ts');
import { db } from '../models/sqlModel';

export const oauthController = {
  //=============================
  // oAuth Set Token
  //=============================

  setToken: (req, res, next) => {
    console.log('storeToken fired');
    console.log('req.query.code: ', req.query.code);
    const clientId = 'fc863cedc9ecd45da5de';
    const clientSecret = 'da6f0104ab5cf5d90cbd5cb6abf46b69e09ac10a';
    const body = {
      client_id: clientId,
      client_secret: clientSecret,
      code: req.query.code,
    };
    fetch(`https://github.com/login/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('successfully created user');
        console.log('response: ', response);
        fetch('https://api.github.com/user', {
          method: 'GET',
          headers: {
            Authorization: `${response.token_type} ${response.access_token}`,
            Accept: 'application/json',
          },
        })
          .then((response) => response.json())
          .then((response) => {
            console.log('response from github api', response);
            res.locals.username = response.login;
            return next();
          })
          .catch((err) => {
            next({
              log: `Error in oauthController.setToken in request to github api. Details: ${err}`,
              message: {
                err: 'An error occurred in the oauthController.setToken',
              },
            });
          });
      })
      .catch((err) => {
        next({
          log: `Error in oauthController.setToken. Details: ${err}`,
          message: { err: 'An error occurred in the oauthController.setToken' },
        });
      });
  },
  redirect: (req, res, next) => {
    console.log('redirect fired');
    return next();
    if (err) {
      (err) => {
        return next({
          log: `Error in oauthController.setToken. Details: ${err}`,
          message: { err: 'An error occurred in the oauthController.setToken' },
        });
      };
    }
  },
};
