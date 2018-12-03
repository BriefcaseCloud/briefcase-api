// External Dependencies
import * as admin from 'firebase-admin'
const db = admin.firestore()
import { createUsecase } from '../utils'

/*********************
 **     Storage     **
 *********************/


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
      doc.set(createUsecase(doc.id))
      return doc
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
    .doc(puid)
    .collection('usecases')
    .doc(ucid)
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
