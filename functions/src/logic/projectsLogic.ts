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
      .then((proj) => {console.log(proj); return proj})
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
    // console.log(req.body)
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
    return projectsStorage
        .deleteProjects(req.params.puid)
        .then(() => res.status(200).send())
        .catch(err => {
            console.error(err);
            return res.status(500).send("Server Error");
        });
}

/**
 * Get basic usecase template
 * @param req - express request object
 * @param res - express response object
 */
export function getTemplate(req: express.Request, res: express.Response) {
  return projectsStorage
    .getTemplate()
    .then(template => res.status(200).send({ template }))
    .catch(err => {
      console.error(err)
      return res.status(500).send('Server Error')
    })
}

/**
 * share project with other users
 * @param req - express request object
 * @param req.body.puid project id to share
 * @param req.body.users users to share with nad their permissions
 * @param res - express response object
 */
export function shareProjects(req: express.Request, res: express.Response) {
    const usersToShareTo = req.body.users;
    return usersToShareTo.forEach(newUser => {
        projectsStorage.addProjectUsers(req.body.puid, newUser)
        .then(() => usersStorage.addUserProject(newUser.user, req.body.puid))
        .then(() => res.status(200).send())
        .catch(err => {
            console.error(err)
            return res.status(500).send('Server Error')
        })
    });
}
