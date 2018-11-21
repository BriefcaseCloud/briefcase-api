// External Dependencies
import * as express from "express";
// Internal Dependencies
import * as authLogic from '../logic/authLogic'

// Router to be used in the index.ts (sent to firebase functions as api)
export const authRouter = express.Router();

/*********************
 **       API       **
 *********************/

// Validate user information
authRouter.post("/", authLogic.verifyUser);

// intercept un-matched routes, respond 404
authRouter.get("*", async (req: express.Request, res: express.Response) => {
  res.status(404).send("This route does not exist.");
});
