// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from 'firebase-admin'
import { DocumentSnapshot } from '@google-cloud/firestore';
// import * as firebase from 'firebase'
const db = admin.firestore()

/*********************
 **     Storage     **
 *********************/

/**
 * Get usernames of all platform members
 * @returns [username]
 */
export function readUsernames(): Promise<Array<String>> {
  return db
    .collection('users')
    .get()
    .then((querySnapshot: FirebaseFirestore.QuerySnapshot) => {
      if (querySnapshot.empty) return []
      return querySnapshot.docs.map(
        (doc: FirebaseFirestore.QueryDocumentSnapshot) =>
          doc.data().username
      )
    })
}

/**
 * Create user object
 * @param username
 * @returns user's new uuid
 */
export function createUser(username) {
  return db
    .collection('users')
    .add({ username, projects: [] })
    .then(docRef => {
      console.log(`created user: ${username} with id: ${docRef.id}`)
      return docRef.id
    })
}

/**
 * Get user object
 * @param uuid
 * @returns user object
 */
export function readUser(uuid) {
  return db
    .collection('users')
    .doc(`${uuid}`)
    .get()
    .then((doc: FirebaseFirestore.DocumentSnapshot) => doc.data())
}

/**
 * Delete user object
 * @param uuid
 */
export function deleteUser(uuid) {
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
export function updateUser(uuid) {
  return db
    .collection('users')
    .doc(`${uuid}`)
    .get()
    .then((documentSnapshot: FirebaseFirestore.DocumentSnapshot) => {
      if (documentSnapshot.exists) return documentSnapshot.ref
      else {
        console.log(`User with uuid: ${uuid} not found`)
        return null
      }
    })
    .then(doc => doc.update({ last_login: Date.now() }))
}

/**
 * Update user projects
 * @param uuid - unique user identifier
 * @param puid - unique project identifier
 */
export async function addUserProject(uuid, puid) {
    return db
    .collection('users')
    .doc(`${uuid}`)
    .update({
        projects: admin.firestore.FieldValue.arrayUnion(`${puid}`)
    })
}

/**
 * Update user projects
 * @param uuid - unique user identifier
 * @param puid - unique project identifier
 */
export async function removeUserProject(uuid, puid) {
    return db
    .collection('users')
    .doc(`${uuid}`)
    .update({
        projects: admin.firestore.FieldValue.arrayRemove(`${puid}`)
    })
}
