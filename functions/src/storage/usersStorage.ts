// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from "firebase-admin";
const db = admin.firestore();

/*********************
 **     Storage     **
 *********************/

/**
 * Get usernames of all platform members
 * @returns [username]
 */
export async function getUsernames() {
    return db
      .collection("users")
      .get()
      .then((qsnapshot: FirebaseFirestore.QuerySnapshot) => {
        if (qsnapshot.empty === undefined) return [];
        // FIXME: this will NOT scale
        const usernames = [];
        qsnapshot.forEach((qdsnapshot: FirebaseFirestore.QueryDocumentSnapshot) =>
          usernames.push(qdsnapshot.data().username)
        );
        return usernames;
      });
  }

/**
 * Get user object
 * @param uuid
 * @returns user object
 */
export async function getUser(uuid) {
    return db
      .collection("users")
      .doc(`${uuid}`)
      .get()
      .then((dsnapshot: FirebaseFirestore.DocumentSnapshot) => dsnapshot.data())
  }
