// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from "firebase-admin";
import { DocumentReference } from "@google-cloud/firestore";
const db = admin.firestore();

/*********************
 **     Storage     **
 *********************/

/**
 * Get usernames of all platform members
 * @returns [username]
 */
export async function readUsernames() {
    return db
      .collection("users")
      .get()
      .then((qsnapshot: FirebaseFirestore.QuerySnapshot) => {
        if (qsnapshot.empty) return [];
        // FIXME: this might not scale
        return qsnapshot.docs.map((qdsnapshot: FirebaseFirestore.QueryDocumentSnapshot) => 
           qdsnapshot.data().username
        );
      });
  }

/**
 * Update user object
 * @param uuid
 * @returns user object
 */
export async function updateUser(uuid) {
  const user = await readUser(uuid);
  if (!user) throw "uuid is not related to any user"
  return db
    .collection("users")
    .doc(`${uuid}`)
    .set({"username": user.username, "last_login": Date.now()})
}

/**
 * Get user object
 * @param uuid
 * @returns user object
 */
export async function readUser(uuid) {
    return db
      .collection("users")
      .doc(`${uuid}`)
      .get()
      .then((dsnapshot: FirebaseFirestore.DocumentSnapshot) => dsnapshot.data())
  }
