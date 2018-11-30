// External Dependencies
import * as admin from "firebase-admin";
const db = admin.firestore();
import * as firebase_tools from "firebase-tools";
import * as usecaseStorage from "./usecaseStorage"

/*********************
 **     Storage     **
 *********************/

export function createProject(project) {
  const docRef = db.collection("projects").doc();
  return docRef.set(project.details).then(() => {
    project.usecases.forEach(usecase => {
      docRef
        .collection("usecases")
        .add(usecase)
        .catch(err => {
          console.log(err);
          throw err;
        });
    });
  });
}

export async function getProjects(uuid) {
    var projects = [];
    const userProjectsList = await getUserProjectsList(uuid);
    for(var project in userProjectsList){
        var singleproject: any = {};
        singleproject.details  = await getProjectDetails(userProjectsList[project]);
        singleproject.useCases = await getProjectUseCases(userProjectsList[project]);
        singleproject.details.puid = userProjectsList[project];
        projects.push(singleproject);
    }
    return projects;
}

export async function deleteProjects(puid) {
    console.log(
        `User has requested to delete path projects/${puid}`
      );
    usecaseStorage.deleteAllUseCases(puid)
    .then(() => {
        return db
        .collection('projects')
        .doc(`${puid}`)
        .delete()
    })
    

}


export async function getTemplate() {
  const singleproject: any = {};

  return getProjectDetails("template")
    .then(data => {
      singleproject.details = data;
      return getProjectUseCases("template");
    })
    .then(useCases => {
      singleproject.usecases = useCases;
    })
    .then(() => {
      return singleproject;
    });
}

export function getUserProjectsList(uuid) {
  return db
    .collection("users")
    .doc(uuid)
    .get()
    .then(doc => doc.data().projects);
}

export async function getProjectUseCases(projID) {
  return db
    .collection("projects")
    .doc(projID)
    .collection("usecases")
    .get()
    .then(cases => {
      return cases.docs.map(usecase => usecase.data());
    });
}

export async function getProjectDetails(projID) {
  return db
    .collection("projects")
    .doc(projID)
    .get()
    .then(doc => doc.data());
}
