// External Dependencies
import * as express from 'express'
// Internal Dependencies
import * as projectsStorage from '../storage/projectsStorage'
import * as usersStorage from '../storage/usersStorage'

/*********************
 **      Logic      **
 *********************/

/**
 * Get project
 * @param req - express request object
 * @param req.params - url params
 * @param req.params.puid - project to get
 * @param res - express response object
 */
export async function getProject(req: express.Request, res: express.Response) {
  const { puid } = req.params
  if (projectsStorage.projectExists(puid)) {
    return projectsStorage
      .getProjectDetails(puid)
      .then(project => res.status(200).send({ project }))
      .catch(err => {
        console.error(err)
        return res.status(500).send('Server Error')
      })
  } else {
    return res.status(400).send(`No project with puid: ${puid}`)
  }
}

/**
 * Add blank project to user
 * @param req - express request object
 * @param req.body - request body
 * @param req.body.project - project info to save
 * @param res - express response object
 */
export function addProject(
  req: express.Request,
  res: express.Response
) {
  return projectsStorage
    .createProject(req.body.project)
    .then((puid) => res.status(200).send({ puid }))
    .catch(err => {
      console.error(err)
      return res.status(500).send('Server Error')
    })
}

/**
 * Save project changes
 * @param req - express request object
 * @param req.params url params
 * @param req.params.puid url params
 * @param req.body project body to update
 * @param res - express response object
 */
export function saveProject(
  req: express.Request,
  res: express.Response
) {
  return projectsStorage
    .updateProject(req.body, req.params.puid)
    .then(() => res.status(200).send())
    .catch(err => {
      console.error(err)
      return res.status(500).send('Server Error')
    })
}

/**
 * Remove project
 * @param req - express request object
 * @param req.params - url params
 * @param req.params.puid - project id to delete
 * @param res - express response object
 */
export function removeProject(
  req: express.Request,
  res: express.Response
) {
  const { puid } = req.params
    return projectsStorage
        .deleteProject(puid)
        .then(() => res.status(200).send())
        .catch(err => {
            console.error(err);
            return res.status(500).send("Server Error");
        });
}

/**
 * share project with other users
 * @param req - express request object
 * @param req.params - url params
 * @param req.params.puid - project id to delete
 * @param req.body[] - request body, should be array
 * @param req.body[].uuid - user id to share with
 * @param req.body[].permission - user permission level
 * @param res - express response object
 */
export function shareProjects(req: express.Request, res: express.Response) {
    const usersToShareTo = req.body;
    const { puid } = req.params

    return usersToShareTo.forEach(newUser => {
        projectsStorage.addProjectUsers(puid, newUser)
        .then(() => usersStorage
          .addUserProject(newUser.user, puid)
          .then(() => res.status(200).send())
        )
        .catch(err => {
            console.error(err)
            return res.status(500).send('Server Error')
        })
    });
}

/**
 * transfer project to other users
 * @param req - express request object
 * @param req.params - url params
 * @param req.params.puid - project id to delete
 * @param req.body - user id to share with
 * @param res - express response object
 */
export function transferProjects(req: express.Request, res: express.Response) {
  const { puid } = req.params
  const { uuid } = req.body

  return projectsStorage.setOwnerProject(puid, uuid)
      .then(() => usersStorage.addUserProject(uuid, puid))
      .then(() => res.status(200).send())
      .catch(err => {
          console.error(err)
          return res.status(500).send('Server Error')
      })
}
