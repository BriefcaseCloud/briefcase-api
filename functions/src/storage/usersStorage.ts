// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from 'firebase-admin'
import * as firebase from 'firebase'
const db = admin.firestore()

/*********************
 **     Storage     **
 *********************/

/**
 * Get usernames of all platform members
 * @returns [username]
 */
export async function readUsernames(): Promise<Array<String>> {
  return db
    .collection('users')
    .get()
    .then((qsnapshot: FirebaseFirestore.QuerySnapshot) => {
      if (qsnapshot.empty) return []
      // FIXME: this might not scale
      return qsnapshot.docs.map(
        (qdsnapshot: FirebaseFirestore.QueryDocumentSnapshot) =>
          qdsnapshot.data().username
      )
    })
}

/**
 * Create user object
 * @param username
 * @param password
 * @returns user's new uuid
 */
export async function createUser(username, password) {
  return db
    .collection('users')
    .add({ username, projects: [] })
    .then(docRef => {
      console.log(docRef.id)
      return docRef.id
    })
}

/**
 * Get user object
 * @param uuid
 * @returns user object
 */
export async function readUser(uuid) {
  return db
    .collection('users')
    .doc(`${uuid}`)
    .get()
    .then((dsnapshot: FirebaseFirestore.DocumentSnapshot) => dsnapshot.data())
}

/**
 * Delete user object
 * @param uuid
 */
export async function deleteUser(uuid) {
  return db
    .collection('users')
    .doc(uuid)
    .delete()
}

/**
 * Update user object
 * @param uuid
 * @returns user object
 */
export async function updateUser(record) {
  const user = await readUser(record.id)
  //   The culprite here for not creating a token and throwing the 500 error, maybe just log that a new user was created? - Dylan
  //   if (!user) throw Error("uuid is not related to any user")
  return db
    .collection('users')
    .doc(`${record.id}`)
    .set(
      { username: record.obj.username, last_login: Date.now() },
      { merge: true }
    )
}

/**
 * Update user object
 * @param uuid
 * @returns user object
 */
export async function createUserProjects(change) {
    return db
    .collection('users')
    .doc(`${change.id}`)
    .update({
        projects: firebase.firestore.FieldValue.arrayUnion(`${change.project}`)
    })
}

export async function removeUserProjects(change) {
    return db
    .collection('users')
    .doc(`${change.id}`)
    .update({
        projects: firebase.firestore.FieldValue.arrayRemove(`${change.project}`)
    })
}
