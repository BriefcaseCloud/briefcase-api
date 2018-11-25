// External Dependencies
import * as express from "express";
// Internal Dependencies
import * as usersLogic from '../logic/usersLogic'

// Router to be used in the index.ts (sent to firebase functions as api)
export const usersRouter = express.Router();

/*********************
 **       API       **
 *********************/

// Get list of usernames
usersRouter.get("/", usersLogic.getUsernames);

// Add new user
usersRouter.post("/", usersLogic.addUser);

// Remove existing user
usersRouter.delete("/:uuid", usersLogic.removeUser);

// Intercept un-matched routes, 
usersRouter.get("*", async (req: express.Request, res: express.Response) => {
  res.status(404).send("This route does not exist.");
});
