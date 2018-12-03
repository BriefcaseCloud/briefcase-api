// External Dependencies
import * as express from 'express'
// Internal Dependencies
import * as projectsLogic from '../logic/projectsLogic'
import { usecasesRouter } from './usecasesApi';

// Router to be used in the index.ts (sent to firebase functions as api)
export let projectsRouter = express.Router()

/*********************
 **       API       **
 *********************/

projectsRouter.post('/', projectsLogic.addProject) // body: {projects: (projectObject)}


projectsRouter.get('/:puid', projectsLogic.getProject)
projectsRouter.put('/:puid', projectsLogic.saveProject)
projectsRouter.delete('/:puid', projectsLogic.removeProject)

// projectsRouter.use('/:puid/usecases', usecasesRouter)
projectsRouter.post('/:puid/share', projectsLogic.shareProjects) //body: {id: (id of project), users: [{user: (id of user), permissions: (user permissions)}]}

// Intercept un-matched routes,
projectsRouter.get('*', async (req: express.Request, res: express.Response) => {
  res.status(404).send('This route does not exist.')
})
