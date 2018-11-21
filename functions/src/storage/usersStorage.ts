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
export async function updateUser(record) {
  const user = await readUser(record.id);
//   The culprite here for not creating a token and throwing the 500 error, maybe just log that a new user was created? - Dylan
//   if (!user) throw Error("uuid is not related to any user")
  return db
    .collection("users")
    .doc(`${record.id}`)
    .set({username: record.obj.username, last_login: Date.now()},{ merge: true })
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
