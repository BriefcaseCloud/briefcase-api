// External Dependencies
import * as admin from 'firebase-admin'
const db = admin.firestore()
import { createUsecase } from '../utils'

/*********************
 **     Storage     **
 *********************/

/**
 * Get list of usecases for project
 * @param puid - project id to get usecases for
 * @returns [usecase]
 */
export function readUsecases(puid) {
  return db
    .collection('projects')
    .doc(`${puid}`)
    .collection('usecases')
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs.map(async (doc) => ({
        ...doc.data(),
        ucid: doc.id,
      })
      )
    })
    .then(usecasePromises => Promise.all(usecasePromises))
}

/**
 * Add use case to project
 * @param puid - project unique identifier
 * @param usecase - usecase content to save
 */
export function addUsecase(puid) {
  return db
    .collection('projects')
    .doc(`${puid}`)
    .collection('usecases')
    .add({})
    .then(doc => {
      return doc
        .set(createUsecase(doc.id))
        .then(() => doc)
    })
}

/**
 * Update usecase in project
 * @param puid - project unique identifier
 * @param usecase - usecase content to save
 */
export function updateUsecase(puid, ucid, usecase) {
  return db
    .collection('projects')
    .doc(`${puid}`)
    .collection('usecases')
    .doc(`${ucid}`)
    .update(usecase)
}

/**
 * Delete usecase on project
 * @param puid - project unique identifier
 * @param ucid - usecase unique identifier
 */
export async function deleteUsecase(puid, ucid) {
  return db
    .collection('projects')
    .doc(`${puid}`)
    .collection('usecases')
    .doc(`${ucid}`)
    .delete()
}

/**
 * Delete all usecase in project
 * @param puid - project unique identifier
 */
export async function deleteAllUsecases(puid) {
  const path = `projects/${puid}/usecases`
  const snapshot = await db.collection(path).get()
  return snapshot.docs.map(doc => doc.ref.delete())
}
