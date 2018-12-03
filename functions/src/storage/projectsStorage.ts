// External Dependencies
import * as admin from 'firebase-admin'
const db = admin.firestore()
import * as usecasesStorage from './usecasesStorage'
import { createProject as createDefaultProject } from '../utils'

/*********************
 **     Storage     **
 *********************/

export function projectExists(puid) {
  return db.collection('projects').doc(`${puid}`).get().then((doc) => doc.exists)
}

 /**
 * Creates new project with details
 * @param uuid - user id to associate with project
 * @returns project id
 */
export function createProject(uuid) {
  const docRef = db.collection('projects').doc()
  return docRef
    .set(createDefaultProject(uuid))
    .then(() => db.collection('projects').doc(docRef.id).get())
    .then((doc) => docRef.id)
}

 /**
 * Updates a project with new data
 * @param project - project contents to update with
 * @param puid - id of project to update
 * @returns project id
 */
export function updateProject(project, puid) {
    delete project.puid
    delete project.usecases
    const docRef = db.collection('projects').doc(`${puid}`)
    return docRef.update(project)
    .then(() => puid)
  }

/**
 * Delete project with puid
 * @param puid - project identifer
 */
export  function deleteProject(puid) {
  console.log(`User has requested to delete path projects/${puid}`)
  return usecasesStorage
    .deleteAllUsecases(`${puid}`)
    .then(() => {
      return db
        .collection('projects')
        .doc(`${puid}`)
        .delete()
    })
    .catch(err => {
      console.error(err)
      throw err
    })
}

/**
 * Get list of projects for user
 * @param uuid - user id to get projects for
 * @returns [project]
 */
export function getUserProjectsList(uuid) {
  return db
    .collection('users')
    .doc(`${uuid}`)
    .get()
    .then(doc => doc.data().projects)
}



/**
 * Get details of projects
 * @param puid - user id to get projects for
 * @returns project details
 */
export function getProjectDetails(puid) {
  return db
    .collection('projects')
    .doc(`${puid}`)
    .get()
    .then(doc => doc.data())
}

/**
 * Add user to a project
 * @param puid - project id to add user to
 * @param user - user to add to project
 */
export function addProjectUsers(puid,user) {
    return db
      .collection('projects')
      .doc(puid)
      .update({
        users: admin.firestore.FieldValue.arrayUnion(user)
    })
}

/**
 * Remove user from a project
 * @param puid - project id to remove user from 
 * @param user - user to remove from project
 * @returns project details
 */
export function deleteProjectUser(puid,user) {
    return db
      .collection('projects')
      .doc(puid)
      .update({
        users: admin.firestore.FieldValue.arrayRemove(user)
    })
}
