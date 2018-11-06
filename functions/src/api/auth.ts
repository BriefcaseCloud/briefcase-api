import * as express from "express";
// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from "firebase-admin";
// Token library
import * as AuthToken from "AuthToken";

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
  db.collection("users")
    .where("id", "==", `${id}`)
    .get()
    .then((qsnapshot: FirebaseFirestore.QuerySnapshot) =>
      qsnapshot.docs[qsnapshot.size - 1].data()
    )
    .then(record => {
      if (record === undefined) {
        // if no matching record, respond 400
        res.status(400).send("No user with ID available");
      } else if (password === record.password) {
        // if password match, save token to auth collection
        AuthToken.createToken(id)
          .then(newToken => {
            // if successful, respond 200 with token
            res.status(200).send(JSON.stringify({ token: newToken }));
          })
          .catch(() => {
            // if error, respond 500
            res.status(500).send("Server Error");
          });
      } else {
        // otherwise respond 401
        res.status(401).send("invalid password");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Server Error");
    });
});

// intercept un-matched routes, respond 404
authRouter.get("*", async (req: express.Request, res: express.Response) => {
  res.status(404).send("This route does not exist.");
});
