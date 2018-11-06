import * as express from "express";
// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from "firebase-admin";
// Token library
import * as token from "../token";

// This is the router which will be imported in our
// api hub (the index.ts which will be sent to Firebase Functions).
export let authRouter = express.Router();
const db = admin.firestore();

authRouter.post("/", async function verifyUser(
  req: express.Request,
  res: express.Response
) {
  const { id, password } = req.body;

  // get user with id
  const usr = db.collection("users").where("id", "==", `${id}`);
  usr
    .get()
    .then(snapshot => {
      // process list
      let last;
      snapshot.forEach(doc => (last = doc));
      const record = last.data();
      // check if password match
      if (password === record.password) {
        // if so generate and save new token
        const newToken = token.generateToken(id, Date.now());
        token
          .saveToken(id, newToken)
          .then(() => {
            console.log("token saved");
          })
          .catch(() => {
            console.log("token not saved");
          });
        res.status(200).send(JSON.stringify({ token: newToken }));
      } else {
        // otherwise return unauthorized
        res.status(401).send("invalid password");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("No user with ID available");
    });
});

// Useful: Let's make sure we intercept un-matched routes and notify the client with a 404 status code
authRouter.get("*", async (req: express.Request, res: express.Response) => {
  res.status(404).send("This route does not exist.");
});
