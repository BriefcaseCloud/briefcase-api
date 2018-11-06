// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from "firebase-admin";

const db = admin.firestore();

export async function createToken(id) {
  const token = Date.now();
  return db
    .collection("auth")
    .doc(`${id}`)
    .set({ token: `${token}`, created: Date.now() })
    .then(() => token)
    .catch(err => {
      console.error("error saving token: ", err);
      throw err;
    });
}

export async function isTokenValid(id, token) {
  return db
    .collection("auth")
    .doc(`${id}`)
    .get()
    .then(dsnapshot => dsnapshot.data())
    .then(record => record.token === token);
}

export async function lookupId(token) {
  return db
    .collection("auth")
    .where("token", "==", `${token}`)
    .get()
    .then(qsnapshot => qsnapshot.docs[qsnapshot.size - 1].id);
}
