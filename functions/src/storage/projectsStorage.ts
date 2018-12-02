// External Dependencies
import * as admin from 'firebase-admin'
const db = admin.firestore()
import * as usecaseStorage from './usecaseStorage'

/*********************
 **     Storage     **
 *********************/

 /**
 * Creates new project with details
 * @param project - project contents to create with
 * @returns project id
 */
export function createProject(project) {
  const docRef = db.collection('projects').doc()
  return docRef.set(project.details).then(() => {
    project.usecases.forEach(usecase => {
      docRef
        .collection('usecases')
        .add(usecase)
        .catch(err => {
          console.error(err)
          throw err
        })
    })
    return docRef.id
  })
}

 /**
 * Updates a project with new data
 * @param project - project contents to update with
 * @param puid - id of project to update
 * @returns project id
 */
export function updateProject(project,puid) {
    delete project.details['puid']
    const docRef = db.collection('projects').doc(puid)
    return docRef.set(project.details).then(() => {
      project.usecases.forEach(usecase => {
          const newUcid = usecase.ucid
          delete usecase['ucid']
        docRef
          .collection('usecases')
          .doc(newUcid)
          .set(usecase)
          .catch(err => {
            console.log(err)
            throw err
          })
      })
    })
    .then(() => puid)
  }

/**
 * Gets list of projects for use
 * @param uuid - user identifier to get projects for
 * @returns [project]
 */
export async function getProjects(uuid) {
  const projects = []
  const userProjectsList = await getUserProjectsList(`${uuid}`)
  for (const project in userProjectsList) {
    const singleproject: any = {}
    singleproject.details = await getProjectDetails(userProjectsList[project])
    singleproject.usecases = await getProjectUseCases(userProjectsList[project])
    singleproject.details.puid = userProjectsList[project]
    projects.push(singleproject)
  }
  return projects
}

/**
 * Delete project with puid
 * @param puid - project identifer
 */
export  function deleteProjects(puid) {
  console.log(`User has requested to delete path projects/${puid}`)
  return usecaseStorage
    .deleteAllUseCases(`${puid}`)
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
 * Gets project template
 * @param project - project contents to create with
 * @returns project id
 */
export  function getTemplate() {
  const singleProject: any = {}

  return getProjectDetails('template')
    .then(data => {
      singleProject.details = data
      return getProjectUseCases('template')
    })
    .then(useCases => {
      singleProject.usecases = useCases
    })
    .then(() => {
      return singleProject
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
 * Get list of usecases for project
 * @param puid - project id to get usecases for
 * @returns [usecase]
 */
export function getProjectUseCases(puid) {
  return db
    .collection('projects')
    .doc(`${puid}`)
    .collection('usecases')
    .get()
    .then(cases => {
      return cases.docs.map(usecase => {
          var newUseCase = usecase.data()
          newUseCase.ucid = usecase.id
          return newUseCase
      })
    })
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
export async function addProjectUsers(puid,user) {
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
export async function deleteProjectUser(puid,user) {
    return db
      .collection('projects')
      .doc(puid)
      .update({
        users: admin.firestore.FieldValue.arrayRemove(user)
    })
}
