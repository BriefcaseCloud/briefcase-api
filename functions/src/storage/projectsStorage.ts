// External Dependencies
import * as admin from "firebase-admin";
const db = admin.firestore();

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

// export async function getProjects(uuid) {
//   const projects = [];
//   const singleproject: any = {};
//   const userProjectsList = await getUserProjectsList(uuid);
//   const promises = userProjectsList.map((project) => {
//     return getProjectDetails(project)
//       .then(data => {
//         singleproject.details = data;
//         return getProjectUseCases(project);
//       })
//       .then(useCases => {
//         singleproject.usecases = useCases;
//         projects.push(singleproject);
//       });
//   });
//   return Promise.all(promises).then(() => {
//     // console.log(projects)
//     return projects;
//   });
// }

export async function getProjects(uuid) {
    var projects = [];
    const userProjectsList = await getUserProjectsList(uuid);
    for(var project in userProjectsList){
        var singleproject: any = {};
        singleproject.details  = await getProjectDetails(userProjectsList[project]);
        singleproject.useCases = await getProjectUseCases(userProjectsList[project]);
        projects.push(singleproject)
    }
    return projects;
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
