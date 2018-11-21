// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from "firebase-admin";
const db = admin.firestore();
import { TOKEN_EXPIRATION } from "../Consts";

/*********************
 **     Storage     **
 *********************/

/**
 * Get user auth object
 * @description Used for password or token checking
 * @param username
 * @returns null | user auth obj
 */
export async function getUserAuth(username) {
  return db
    .collection("auth")
    .where("username", "==", `${username}`)
    .get()
    .then((qsnapshot: FirebaseFirestore.QuerySnapshot) => {
      if (qsnapshot.empty) return null;
      else return qsnapshot.docs[qsnapshot.size - 1].data();
    });
}

/**
 * Creates and binds token to user
 * @param uuid - unique user identifier
 * @returns token
 */
export async function createToken(uuid) {
  const token = Date.now();
  const time = Date.now();
  return db
    .collection("auth")
    .doc(`${uuid}`)
    .set({ token: { tkid: `${token}`, created: time } })
    .then(() => token)
    .catch(err => {
      console.error("error saving token: ", err);
      throw err;
    });
}

/**
 * Check if token is valid for uuid
 * @param token - authentication token
 * @param uuid - unique user identifier
 * @returns bool
 */
export async function isTokenValid(token, uuid) {
  return db
    .collection("auth")
    .doc(`${uuid}`)
    .get()
    .then((dsnapshot: FirebaseFirestore.DocumentSnapshot) => dsnapshot.data())
    .then(record => {
      if (
        record.token === token &&
        record.created + TOKEN_EXPIRATION >= Date.now()
      ) {
        return true;
      } else {
        return false;
      }
    });
}

/**
 * Lookup uuid given token
 * @param token authentication token
 */
export async function lookupUuid(token) {
  return db
    .collection("auth")
    .where("token/tkid", "==", `${token}`)
    .get()
    .then((qsnapshot: FirebaseFirestore.QuerySnapshot) => {
      if (qsnapshot.empty) return null;
      return qsnapshot.docs[qsnapshot.size - 1];
    })
    .then(
      (qdsnapshot: FirebaseFirestore.QueryDocumentSnapshot) => qdsnapshot.id
    );
}
