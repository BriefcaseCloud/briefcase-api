// External Dependencies
import * as admin from 'firebase-admin'
const db = admin.firestore()
import * as firebase_tools from 'firebase-tools'
import * as usecaseStorage from './usecaseStorage'

/*********************
 **     Storage     **
 *********************/

export function createProject(project) {
  const docRef = db.collection('projects').doc()
  return docRef.set(project.details).then(() => {
    project.usecases.forEach(usecase => {
      docRef
        .collection('usecases')
        .add(usecase)
        .catch(err => {
          console.log(err)
          throw err
        })
    })
    return docRef.id
  })
}

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
  }

export async function getProjects(uuid) {
  const projects = []
  const userProjectsList = await getUserProjectsList(uuid)
  for (const project in userProjectsList) {
    const singleproject: any = {}
    singleproject.details = await getProjectDetails(userProjectsList[project])
    singleproject.usecases = await getProjectUseCases(userProjectsList[project])
    singleproject.details.puid = userProjectsList[project]
    projects.push(singleproject)
  }
  return projects
}

export async function deleteProjects(puid) {
  console.log(`User has requested to delete path projects/${puid}`)
  return usecaseStorage
    .deleteAllUseCases(puid)
    .then(() => {
      return db
        .collection('projects')
        .doc(`${puid}`)
        .delete()
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

export async function getTemplate() {
  const singleproject: any = {}

  return getProjectDetails('template')
    .then(data => {
      singleproject.details = data
      return getProjectUseCases('template')
    })
    .then(useCases => {
      singleproject.usecases = useCases
    })
    .then(() => {
      return singleproject
    })
}

export function getUserProjectsList(uuid) {
  return db
    .collection('users')
    .doc(uuid)
    .get()
    .then(doc => doc.data().projects)
}

export async function getProjectUseCases(projID) {
  return db
    .collection('projects')
    .doc(projID)
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

export async function getProjectDetails(projID) {
  return db
    .collection('projects')
    .doc(projID)
    .get()
    .then(doc => doc.data())
}

export async function UpdateProjectUsers(projID,user) {
    return db
      .collection('projects')
      .doc(projID)
      .update({
        users: admin.firestore.FieldValue.arrayUnion(user)
    })
  }

export async function removeProjectUsers(projID,user) {
    return db
      .collection('projects')
      .doc(projID)
      .update({
        users: admin.firestore.FieldValue.arrayRemove(user)
    })
  }
