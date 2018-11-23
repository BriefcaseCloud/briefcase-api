// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from "firebase-admin";
import * as userStorage from "./usersStorage";
const db = admin.firestore();



export async function getProjects(uuid) {
    var projects = [];
    var singleproject:any = {};
    const userProjectsList = await getUserProjectsList(uuid);
    var promises = userProjectsList.map(project => {
        return getProjectDetails(project)
        .then(data => {
            singleproject.details = data
            return getProjectUseCases(project)
        })
        .then(useCases => {
            singleproject.usecases = useCases
            projects.push(singleproject)
        })
    })
    return Promise.all(promises).then(() => {
        // console.log(projects)
        return projects
    })
}

export async function getTemplate() {
    var singleproject:any = {};

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


export async function getUserProjectsList(uuid){
    return db.collection('users')
    .doc(uuid)
    .get()
    .then(doc => doc.data().projects)
}

export async function getProjectUseCases(projID){
    return db.collection('projects')
    .doc(projID)
    .collection('usecases')
    .get()
    .then(cases => {
       return cases.docs.map(usecase => usecase.data())
    })
}

export async function getProjectDetails(projID){
    return db.collection('projects')
    .doc(projID)
    .get()
    .then(doc => doc.data())
}

export async function createProject(project){
    const docRef = db.collection('projects').doc('template')
    return docRef.set(project.details).then(() => {
        project.usecases.forEach(usecase => {
            docRef.collection('usecases').add(usecase)
        });
        
    })
}