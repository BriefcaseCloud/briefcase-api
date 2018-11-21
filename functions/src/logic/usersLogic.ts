// External Dependencies
import * as express from "express";
// Internal Dependencies
import * as usersStorage from "../storage/usersStorage";

/*********************
 **      Logic      **
 *********************/

/**
 * Get usernames of all platform users
 * @param req - express request object
 * @param res - express response object
 */
export async function getUsernames(
  req: express.Request,
  res: express.Response
) {
  return usersStorage
    .readUsernames()
    .then(usernames => res.status(200).send({ usernames }))
    .catch(err => {
      console.log(err);
      return res.status(500).send("Server Error");
    });
}

/**
 * Get project ids the user is a part of
 * @param req - express request object
 * @param req.body - request body
 * @param req.body.token - authentication token
 * @param res - express response object
 * @returns [pid] (array of project ids)
 */
export async function getUserProjects(
  req: express.Request,
  res: express.Response
) {
  return null;
}
