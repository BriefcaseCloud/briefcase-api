// External Dependencies
import * as admin from 'firebase-admin'
const db = admin.firestore()

/*********************
 **     Storage     **
 *********************/


/**
 * Add use case to project
 * @param puid - project unique identifier
 * @param usecase - usecase content to save
 */
export async function addUseCase(puid, usecase) {
  return db
    .collection('projects')
    .doc(puid)
    .collection('usecases')
    .doc()
    .set(usecase)
}

/**
 * Delete usecase on project
 * @param puid - project unique identifier
 * @param ucuid - usecase unique identifier
 */
export async function deleteUseCase(puid, ucuid) {
  return db
    .collection('projects')
    .doc(puid)
    .collection('usecases')
    .doc(ucuid)
    .delete()
}

/**
 * Delete all usecase in project
 * @param puid - project unique identifier
 */
export async function deleteAllUseCases(puid) {
  const path = `projects/${puid}/usecases`
  const snapshot = await db.collection(path).get()
  return snapshot.docs.map(doc => doc.ref.delete())
}
