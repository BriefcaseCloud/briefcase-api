// External Dependencies
import * as express from 'express'
// Internal Dependencies
import * as usersStorage from '../storage/usersStorage'
import * as authStorage from '../storage/authStorage'
import * as projectsStorage from '../storage/projectsStorage'

/*********************
 **      Logic      **
 *********************/

/**
 * Get usernames of all platform users
 * @param req - express request object
 * @param res - express response object
 */
export function getUsernames(
  req: express.Request,
  res: express.Response
) {
  return usersStorage
    .readUsernames()
    .then(usernames => res.status(200).send({ usernames }))
    .catch(err => {
      console.error(err)
      return res.status(500).send('Server Error')
    })
}

/**
 * Sign-up new user
 * @param req - express request object
 * @param req.body - request body
 * @param req.body.username - username
 * @param req.body.password - password
 * @param res - express response object
 */
export function signupUser(req: express.Request, res: express.Response) {
  const { username, password="defaultpassword" } = req.body
  return usersStorage
    .readUsernames()
    .then(usernames => (usernames.indexOf(username) > -1))
    .then(exists => {
      if (exists) {
        console.log('Username exists')
        res.status(400).send('Username exists')
        return null
      }
      else {
        return usersStorage
          .createUser(username)
          .then(uuid => authStorage.createUser(uuid, username, password))
          .then(() => res.status(200).send(`User ${username} created`))
      }
    })
    .catch(err => {
      console.error(err)
      return res.status(500).send('Server Error')
    })
}

/**
 * Remove existing user
 * @param req - express request object
 * @param req.params - request url params
 * @param req.params.uuid - unique user id to delete
 * @param res - express response object
 */
export async function removeUser(req: express.Request, res: express.Response) {
  const { uuid } = req.params
  if (await usersStorage.userExists(uuid)) {
    return usersStorage
      .deleteUser(uuid)
      .then(() => authStorage.deleteUser(uuid))
      .then(() => res.status(200).send(`User ${uuid} deleted`))
      .catch(err => {
        console.error(err)
        return res.status(500).send('Server Error')
      })
  } else {
    return res.status(400).send(`User with ${uuid} doesn't exist`)
  }
}


/**
 * Get projects for user
 * @param req - express request object
 * @param req.params - request url params
 * @param req.params.uuid - unique user id to get projects for
 * @param res - express response object
 */
export async function getProjects(req: express.Request, res: express.Response) {
  const { uuid } = req.params
  if (await usersStorage.userExists(uuid)) {
    return usersStorage
      .readUser(uuid)
      .then((data) =>
        data.projects.map(async (puid) => ({
          ...(await projectsStorage.getProjectDetails(puid)),
          puid
        }))
      )
      .then((projectsPromises) => Promise.all(projectsPromises))
      .then(projects => res.status(200).send({ projects }))
      .catch(err => {
        console.error(err)
        return res.status(500).send('Server Error')
      })
  } else {
    return res.status(400).send(`User with ${uuid} doesn't exist`)
  }
}

/**
 * Add project for user
 * @param req - express request object
 * @param req.params - request url params
 * @param req.params.uuid - unique user id to get projects for
 * @param res - express response object
 */
export async function createProject(req: express.Request, res: express.Response) {
  const { uuid } = req.params
  if (await usersStorage.userExists(uuid)) {
    return projectsStorage
      .createProject(uuid)
      .then(async (puid) => ({
        ...(await projectsStorage.getProjectDetails(puid)),
        puid
      }))
      .then((project) => res.status(200).send({project}))
      .catch(err => {
        console.error(err)
        return res.status(500).send('Server Error')
      })
  } else {
    return res.status(400).send(`User with ${uuid} doesn't exist`)
  }
}
