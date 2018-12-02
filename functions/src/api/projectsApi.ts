// External Dependencies
import * as express from 'express'
// Internal Dependencies
import * as projectsLogic from '../logic/projectsLogic'
import { usersRouter } from './usersApi'

// Router to be used in the index.ts (sent to firebase functions as api)
export let projectsRouter = express.Router()

/*********************
 **       API       **
 *********************/

projectsRouter.get('/', projectsLogic.getProjects)
projectsRouter.post('/', projectsLogic.addProject)
projectsRouter.delete('/', projectsLogic.removeProject)

projectsRouter.get('/template', projectsLogic.getTemplate)

// Intercept un-matched routes,
projectsRouter.get('*', async (req: express.Request, res: express.Response) => {
  res.status(404).send('This route does not exist.')
})
