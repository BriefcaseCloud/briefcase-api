// External Dependencies
import * as express from 'express'
// Internal Dependencies
import * as projectsStorage from '../storage/projectsStorage'
import * as usersStorage from '../storage/usersStorage'

/*********************
 **      Logic      **
 *********************/

export async function createProjects(
  req: express.Request,
  res: express.Response
) {
    console.log(req.body)
  return projectsStorage
    .createProject(req.body.project)
    .then((id) => res.status(200).send({ puid: id }))
    .catch(err => {
      console.log(err)
      return res.status(500).send('Server Error')
    })
}

export async function getProjects(req: express.Request, res: express.Response) {
  // console.log(req.query.uuid)
  return projectsStorage
    .getProjects(req.query.uuid)
    .then(projects => res.status(200).send({ projects }))
    .catch(err => {
      console.log(err)
      return res.status(500).send('Server Error')
    })
}

export async function removeProjects(
  req: express.Request,
  res: express.Response
) {
    // console.log(req.params.puid)
    return projectsStorage
        .deleteProjects(req.params.puid)
        .then(() => res.status(200).send({success: true}))
        .catch(err => {
            console.log(err);
            return res.status(500).send("Server Error");
        });
}

export async function getTemplate(req: express.Request, res: express.Response) {
  return projectsStorage
    .getTemplate()
    .then(template => res.status(200).send({ template }))
    .catch(err => {
      console.log(err)
      return res.status(500).send('Server Error')
    })
}

// export async function shareProject(req: express.Request, res: express.Response) {
//   const usersToShareTo = req.body.users;
//   const projectId = req.body.id
//   try{
//     for (let index in usersToShareTo){
//         const users = usersToShareTo[index]
//         await projectsStorage.UpdateProjectUsers(projectId,users)
//         await usersStorage.createUserProjects({id: users.user,project: projectId})
//     }
//   } catch (err) {
//     return res.status(500).send('Server Error')
//   }
// }

export async function shareProjects(req: express.Request, res: express.Response) {
    const usersToShareTo = req.body.users;
    const projectId = req.body.id
    return usersToShareTo.forEach(newUser => {
        projectsStorage.UpdateProjectUsers(projectId,newUser)
        .then(() => usersStorage.createUserProjects({id: newUser.user,project: projectId}))
        .then(() => res.status(200).send({success: true}))
        .catch(err => {
            console.log(err)
            return res.status(500).send('Server Error')
        })
    });
}

export async function saveProjects(
    req: express.Request,
    res: express.Response
  ) {
    return projectsStorage
      .updateProject(req.body.project,req.params.puid)
      .then(() => res.status(200).send({ success: true }))
      .catch(err => {
        console.log(err)
        return res.status(500).send('Server Error')
      })
  }