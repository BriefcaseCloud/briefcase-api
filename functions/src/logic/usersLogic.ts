// External Dependencies
import * as express from "express";
// Internal Dependencies
import * as usersStorage from "../storage/usersStorage";
import * as authStorage from "../storage/authStorage";

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
 * Add new user
 * @param req - express request object
 * @param res - express response object
 */
export async function addUser(
  req: express.Request,
  res: express.Response
) {
  const {username, password} = req.body
  return usersStorage
    .readUsernames()
    .then(usernames => usernames.includes(username))
    .then(exists => {
      if (exists) throw Error("Username exists")
      return usersStorage.createUser(username, password)
    })
    .then(uuid => authStorage.createUser(uuid, username, password))
    .then(() => res.status(200).send(`User ${username} created`))
    .catch(err => {
      console.log(err);
      return res.status(500).send("Server Error");
    });
}

/**
 * Remove existing user
 * @param req - express request object
 * @param res - express response object
 */
export async function removeUser(
  req: express.Request,
  res: express.Response
) {
  const {uuid} = req.params
  return usersStorage
    .deleteUser(uuid)
    .then(() => authStorage.deleteUser(uuid))
    .then(() => res.status(200).send(`User ${uuid} deleted`))
    .catch(err => {
      console.log(err);
      return res.status(500).send("Server Error");
    });
}

