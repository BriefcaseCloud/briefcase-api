// // express router
// import * as express from "express";
// // The Firebase Admin SDK to access the Firebase Realtime Database.
// import * as admin from "firebase-admin";
// // Token library
// import * as AuthToken from "../modules/AuthToken";

// // This is the router which will be imported in our
// // api hub (the index.ts which will be sent to Firebase Functions).
// export let projectsRouter = express.Router();
// const db = admin.firestore();

// projectsRouter.get("/", async function verifyUser(
//   req: express.Request,
//   res: express.Response
// ) {
//     db.collection("projects")
//         .where("collaborators", "array-contains", )
// });
