// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from 'firebase-admin'
const db = admin.firestore()
import { TOKEN_EXPIRATION } from '../constants'
import { createAuth } from '../utils'

/*********************
 **     Storage     **
 *********************/

/**
 * Create user auth object
 * @param uuid
 * @param username
 * @param password
 */
export function createUser(uuid, username, password) {
  return db
    .collection('auth')
    .doc(uuid)
    .set(createAuth(username, password))
}

/**
 * Read user auth object
 * @description Used for password or token checking
 * @param username
 * @returns null | {id, obj: user_auth_obj}
 */
export function readUser(username) {
  return db
    .collection('auth')
    .where('username', '==', `${username}`)
    .get()
    .then((querySnapshot: FirebaseFirestore.QuerySnapshot) => {
      if (querySnapshot.empty) return null
      const qdsnapshot = querySnapshot.docs[querySnapshot.size - 1]
      return {
        id: qdsnapshot.id,
        obj: qdsnapshot.data(),
      }
    })
}

/**
 * Delete user auth object
 * @param uuid
 */
export function deleteUser(uuid) {
  return db
    .collection('auth')
    .doc(uuid)
    .delete()
}

/**
 * Creates and binds token to user
 * @param uuid - unique user identifier
 * @returns token
 */
export function createToken(uuid) {
  const token = Date.now()
  const time = Date.now()
  return db
    .collection('auth')
    .doc(`${uuid}`)
    .update({ 'token.tkid': `${token}`, 'token.created': time })
    .then(() => token)
    .catch(err => {
      console.error('error saving token: ', err)
      throw err
    })
}

/**
 * Check if token is valid for uuid
 * @param token - authentication token
 * @param uuid - unique user identifier
 * @returns bool
 */
export function isTokenValid(token, uuid) {
  if (!uuid) return false

  return db
    .collection('auth')
    .doc(`${uuid}`)
    .get()
    .then((dsnapshot: FirebaseFirestore.DocumentSnapshot) => dsnapshot.data())
    .then(record => {
      if (
        record.token === token &&
        record.created + TOKEN_EXPIRATION >= Date.now()
      ) {
        return true
      } else {
        return false
      }
    })
}

/**
 * Lookup uuid given token
 * @param token authentication token
 */
export async function lookupUuid(token) {
  return db
    .collection('auth')
    .where('token.tkid', '==', `${token}`)
    .get()
    .then((querySnapshot: FirebaseFirestore.QuerySnapshot) => {
      if (querySnapshot.empty) return null
      return querySnapshot.docs[querySnapshot.size - 1].id
    })
}
