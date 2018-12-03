// External Dependencies
import * as express from 'express'
// Internal Dependencies
import * as usersLogic from '../logic/usersLogic'

// Router to be used in the index.ts (sent to firebase functions as api)
export const usersRouter = express.Router()

/*********************
 **       API       **
 *********************/

usersRouter.get('/', usersLogic.getUsernames)
usersRouter.post('/', usersLogic.signupUser)
usersRouter.delete('/:uuid', usersLogic.removeUser)

usersRouter.get('/:uuid/projects', usersLogic.getProjects)
usersRouter.post('/:uuid/projects', usersLogic.createProject)

// Intercept un-matched routes,
usersRouter.get('*', async (req: express.Request, res: express.Response) => {
  res.status(404).send('This route does not exist.')
})
