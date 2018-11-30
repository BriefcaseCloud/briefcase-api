// External Dependencies
import * as admin from 'firebase-admin'
const db = admin.firestore()

/*********************
 **     Storage     **
 *********************/

export async function deleteAllUseCases(puid) {
  const path = `projects/${puid}/usecases`
  const snapshot = await db.collection(path).get()
  return snapshot.docs.map(doc => doc.ref.delete())
}

export async function deleteUseCase(puid, usecaseid) {
  return db
    .collection('projects')
    .doc(puid)
    .collection('usecases')
    .doc(usecaseid)
    .delete()
}

export async function addUseCase(puid, usecase) {
  return db
    .collection('projects')
    .doc(puid)
    .collection('usecases')
    .doc()
    .set(usecase)
}
